import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableRow } from '../../../models/table-row.model';
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
  tableTotal: number;
  tableRowsSubscription: Subscription;
  tableTotalSubscription: Subscription;
  displayTableTotal: string;

  constructor(public tableRowInsertionService: TableRowInsertionService) {}

  makeSpacesTableToal(tableTotal: number): string {
    const parts = tableTotal.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }

  ngOnInit() {
    this.tableRowsSubscription = this.tableRowInsertionService
      .getTableUpdateListener()
      .subscribe((tableRows: TableRow[]) => {
        this.tableData = tableRows;
        console.log(this.tableData);
      });

    this.tableTotalSubscription = this.tableRowInsertionService
      .getTableTotalUpdateListener()
      .subscribe((tableTotal: number) => {
        this.tableTotal = tableTotal;
        this.displayTableTotal = this.makeSpacesTableToal(
          Number(this.tableTotal.toFixed(2))
        );
        console.log(this.tableTotal);
      });
  }

  ngOnDestroy() {
    this.tableRowsSubscription.unsubscribe();
    this.tableTotalSubscription.unsubscribe();
  }
}
