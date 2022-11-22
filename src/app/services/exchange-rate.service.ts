import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rates } from '../models/rates.model';
import { RatesData } from '../models/rates-data.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
  rates: {
    currencyCode: string;
    value: number;
  }[] = [];

  baseURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/';
  baseCurrency = 'usd.json';

  exchangeRatesURL: string = this.baseURL + this.baseCurrency;

  constructor(private http: HttpClient) {}

  getRates(): Observable<Rates> {
    return this.http.get<RatesData>(this.exchangeRatesURL)
      .pipe(map(ratesData => ratesData.usd));
  }
}
