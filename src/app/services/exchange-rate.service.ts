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

  baseURL = 'https://api.exchangeratesapi.io/';
  baseCurrency = 'latest?base=USD';

  exchangeRatesURL: string = this.baseURL + this.baseCurrency;

  constructor(private http: HttpClient) {}

  getRates(): Observable<Rates> {
    return this.http.get<RatesData>(this.exchangeRatesURL)
      .pipe(
        map(ratesData => {
          return ratesData.rates;
        })
      );
  }
}
