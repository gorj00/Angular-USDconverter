import { TableRow } from '../models/table-row.model';
import { Injectable, ɵConsole } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableRowInsertionService {
  tableRows: TableRow[] = [];
  tableRowsUpdated = new Subject<TableRow[]>();
  // Spread operator used to not affect the original tableRows array (a copy is made)
  getTableRows() {
    return [...this.tableRows];
  }

  getTableUpdateListener() {
    return this.tableRowsUpdated.asObservable();
  }

  addTableRow(tableRow: TableRow) {
    this.tableRows.push(tableRow);
    this.tableRowsUpdated.next([...this.tableRows]);
    console.log('Table: ', this.tableRows);
  }
}
