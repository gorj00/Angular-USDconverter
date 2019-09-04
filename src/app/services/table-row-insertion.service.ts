import { TableRow } from '../models/table-row.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableRowInsertionService {
  tableRows: TableRow[] = [];
  tableRowsUpdated = new Subject<TableRow[]>();
  tableTotal = 0;
  tableTotalUpdated = new Subject<number>();

  getTableUpdateListener() {
    return this.tableRowsUpdated.asObservable();
  }

  addTableRow(tableRow: TableRow) {
    this.tableRows.push(tableRow);
    this.tableRowsUpdated.next([...this.tableRows]);
  }

  getTableTotalUpdateListener() {
    return this.tableTotalUpdated.asObservable();
  }

  incrementTableTotal(newAmount: number) {
    this.tableTotalUpdated.next(this.tableTotal);
  }

}
