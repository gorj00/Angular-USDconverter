import { Component, OnInit } from '@angular/core';
import { ExchangeRateService } from '../../../services/exchange-rate.service';
import { TableRow } from '../../../models/table-row.model';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowInsertionService } from '../../../services/table-row-insertion.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableData: TableRow[] = [];
  displayedColumns: string[] = ['amount', 'amount-in-usd'];
  dataSource: TableRow[] = this.tableData;
  tableTotal = 0;

  constructor(
    private exchangeRateService: ExchangeRateService,
    public tableRowInsertionService: TableRowInsertionService
  ) {}

  ngOnInit() {
    this.tableData = this.tableRowInsertionService.getTableRows();
  }
}
