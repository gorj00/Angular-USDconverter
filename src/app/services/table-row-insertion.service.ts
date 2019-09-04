import { TableRow } from '../models/table-row.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableRowInsertionService {
  tableRows: TableRow[] = [];
  tableRowsUpdated = new Subject<TableRow[]>();
  // Spread operator used to not affect the original tableRows array (a copy is made)
  getTableRows() {
    return [...this.tableRows];
  }

  addTableRow(tableRow: TableRow) {
    this.tableRows.push(tableRow);
    this.tableRowsUpdated.next([...this.tableRows]);
  }
}
