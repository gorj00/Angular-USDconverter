import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  showConvertedAmount() {
    if (this.amount !== null && this.select !== null) {
      const currencyInDollar = this.rates[this.select];
      const convertedAmount = this.amount / currencyInDollar;
      const editedConvertedAmount = +convertedAmount.toFixed(2);
      return '$ ' + this.makeSpacesInNumber(editedConvertedAmount);
    } else {
      return '...';
    }
  }

  onInsertIntoTable() {
    let tableRow: TableRow;
    tableRow = {
      amount: this.makeSpacesInNumber(this.amount) + ' ' + this.select,
      amountInUsd: '80 USD'/* this.convertedAmount.toString() */
    };
    console.log(tableRow);
    this.tableRowInsertionService.addTableRow(tableRow);
  }

  getCurrencyAmount() {
    return this.rates ? this.rates[this.select] : '';
  }

  // getCurrencyCode() {
  //   if (this.rates) {
  //     const codes = Object.keys(this.rates);
  //     const code =
  //   }
  // }

  ngOnInit() {
    this.exchangeRateService.getRates().subscribe(
      rates => {
        this.rates = rates;
      },
      error => console.log(error),
      () => console.log('getRates() completed!')
    );
  }
}
