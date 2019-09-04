import { TableRow } from '../models/table-row.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableRowInsertionService {
  tableRows: TableRow[] = [];
  tableRowsUpdated = new Subject<TableRow[]>();
  tableTotal = 0;
  tableTotalUpdated = new Subject<number>();

  getTableUpdateListener(): Observable<TableRow[]> {
    return this.tableRowsUpdated.asObservable();
  }

  addTableRow(tableRow: TableRow): void {
    this.tableRows.push(tableRow);
    this.tableRowsUpdated.next([...this.tableRows]);
  }

  getTableTotalUpdateListener(): Observable<number> {
    return this.tableTotalUpdated.asObservable();
  }

  incrementTableTotal(newAmount: number): void {
    this.tableTotalUpdated.next(this.tableTotal);
  }

}
