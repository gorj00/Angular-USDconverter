import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../../services/exchange-rate.service';
import { TableRow } from '../../../models/table-row.model';
import { Rates } from '../../../models/rates.model';
import { FormGroup } from '@angular/forms';
import { TableRowInsertionService } from '../../../services/table-row-insertion.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  rates: Rates;
  amount: number = null;
  select: string = null;
  convertedAmount: number;

  constructor(
    private exchangeRateService: ExchangeRateService,
    public tableRowInsertionService: TableRowInsertionService
  ) {}

  makeSpacesInNumber(num: number): string {
    if (this.amount !== null) {
      const parts = num.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    } else {
      return null;
    }
  }

  showConvertedAmount(): string {
    if (this.amount !== null && this.select !== null) {
      const currencyInDollar = this.rates[this.select];
      const convertedAmount = this.amount / currencyInDollar;
      const editedConvertedAmount = +convertedAmount.toFixed(2);
      this.convertedAmount = editedConvertedAmount;
      return '$ ' + this.makeSpacesInNumber(editedConvertedAmount);
    } else {
      return '...';
    }
  }

  onInsertIntoTable(): void {
    let tableRow: TableRow;

    this.tableRowInsertionService.tableTotal += this.convertedAmount;

    const enteredAmountSelCode =
      this.makeSpacesInNumber(this.amount) + ' ' + this.select;
    const convertedAmountUSDCode = this.makeSpacesInNumber(this.convertedAmount) + ' USD';

    tableRow = {
      amount: enteredAmountSelCode,
      amountInUsd: convertedAmountUSDCode
    };
    // console.log(tableRow);
    // console.log(this.tableRowInsertionService.tableTotal);
    this.tableRowInsertionService.addTableRow(tableRow);
    this.tableRowInsertionService.incrementTableTotal(this.convertedAmount);
  }

  getCurrencyAmount(): string {
    return this.rates ? this.rates[this.select] : '';
  }

  ngOnInit() {
    this.exchangeRateService.getRates().subscribe(
      (rates: Rates) => {
        this.rates = rates;
      },
      error => console.log(error),
      () => console.log('getRates() completed!')
    );
  }
}
