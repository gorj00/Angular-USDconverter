import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExchangeRateService } from '../../../services/exchange-rate.service';
import { TableRow } from '../../../models/table-row.model';
import { MatTableDataSource } from '@angular/material/table';
import { TableRowInsertionService } from '../../../services/table-row-insertion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {
  tableData: TableRow[] = [];
  displayedColumns: string[] = ['amount', 'amount-in-usd'];
  tableTotal = 0;
  tableRowsSubscription: Subscription;

  constructor(
    private exchangeRateService: ExchangeRateService,
    public tableRowInsertionService: TableRowInsertionService
  ) {}

  ngOnInit() {
    this.tableData = this.tableRowInsertionService.getTableRows();
    this.tableRowsSubscription = this.tableRowInsertionService.getTableUpdateListener()
      .subscribe((tableRows: TableRow[]) => {
        this.tableData = tableRows;
        console.log(this.tableData);
      });
  }

  ngOnDestroy() {
    this.tableRowsSubscription.unsubscribe();
  }
}
