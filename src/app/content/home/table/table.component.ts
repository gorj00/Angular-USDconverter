import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../../services/exchange-rate.service';
import { TableRow } from '../../../models/table-row.model';
import { MatTableDataSource } from '@angular/material/table';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

const tableData: TableRow[] = [
  { amount: '30 EUR', amountInUsd: '28 USD' },
  { amount: '30 EUR', amountInUsd: '28 USD' },
  { amount: '30 EUR', amountInUsd: '28 USD' },
  { amount: '30 EUR', amountInUsd: '28 USD' }
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [ExchangeRateService]
})
export class TableComponent implements OnInit {
  // displayedColumns: string[] = [
  //   'position',
  //   'name',
  //   'weight',
  //   'symbol'
  // ];
  // dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['amount', 'amount-in-usd'];
  dataSource = tableData;
  tableSum = 0;

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit() {}
}
