import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RatesData } from '../models/rates-data.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ExchangeRateService {
  rates: {
    currencyCode: string;
    value: number;
  }[] = [];

  baseURL = 'https://api.exchangeratesapi.io/';
  baseCurrency = 'latest?base=USD';

  exchangeRatesURL = this.baseURL + this.baseCurrency;

  constructor(private http: HttpClient) {}

  getRates() {
    return this.http.get<RatesData>(this.exchangeRatesURL)
      .pipe(
        map(ratesData => {
          return ratesData.rates;
        })
      );
  }
}
