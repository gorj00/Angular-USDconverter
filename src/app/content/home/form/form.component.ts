import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../../services/exchange-rate.service';
import { TableRowInsertionService } from '../../../services/table-row-insertion.service';
import { TableRow } from '../../../models/table-row.model';
import { Rates } from '../../../models/rates.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  rates: Rates;
  amount: number = null;
  select: string = null;
  convertedAmount: number;

  constructor(
    private exchangeRateService: ExchangeRateService,
    private tableRowInsertionService: TableRowInsertionService
  ) {}

  // Makes 3 215 211 from 3215211
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
      const currencyPerDollar: number = this.rates[this.select];
      const convertedAmount: number = this.amount / currencyPerDollar;
      const editedConvertedAmount: number = +convertedAmount.toFixed(2);

      this.convertedAmount = editedConvertedAmount;

      return '$ ' + this.makeSpacesInNumber(editedConvertedAmount);
    } else {
      return '...';
    }
  }

  onInsertIntoTable(): void {
    let tableRow: TableRow;

    // Increment total sum of the table
    this.tableRowInsertionService.tableTotal += this.convertedAmount;

    // Set entered amount (CZK | EUR | GBP) and converted amount (USD)
    const enteredAmountSelCode =
      this.makeSpacesInNumber(this.amount) + ' ' + this.select;
    const convertedAmountUSDCode =
      this.makeSpacesInNumber(this.convertedAmount) + ' USD';

    // Store amounts above into a new table row object
    tableRow = {
      amount: enteredAmountSelCode,
      amountInUsd: convertedAmountUSDCode
    };

    // Insert new row to the table
    this.tableRowInsertionService.addTableRow(tableRow);
    // Inform table the total was incremented
    this.tableRowInsertionService.incrementTableTotal(this.convertedAmount);
  }

  ngOnInit() {
    // Fetch exchange rates
    this.exchangeRateService.getRates().subscribe(
      (rates: Rates) => {
        this.rates = rates;
      },
      error => console.log(error),
      () => console.log('getRates() completed!')
    );
  }
}
