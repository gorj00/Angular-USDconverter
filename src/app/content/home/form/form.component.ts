import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../../services/exchange-rate.service';
import { RatesData } from '../../../models/rates-data.model';
import { Rates } from '../../../models/rates.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ExchangeRateService]
})
export class FormComponent implements OnInit {
  form: FormGroup;
  rates: Rates;
  amount: number = null;
  select: string = null;
  convertedAmount: number;

  constructor(private exchangeRateService: ExchangeRateService) {}

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

  // showCurrency() {
  //   return this.rates ? this.rates[this.select] : '';
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
