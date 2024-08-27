import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {MatPaginator, } from '@angular/material/paginator';
import {MatSort, } from '@angular/material/sort';

import {UsersService} from "../../services/users.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {User} from "../../models/models";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    NgIf,
    MatCheckbox,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatPaginator,
    MatLabel,
    NgForOf
  ]
})
export class TableComponent implements OnInit {
  private UsersService = inject(UsersService);
  public displayedColumns: string[] = ['_id', 'name', 'age', 'company', 'email', 'address'];
  public allColumns: string[] = [...this.displayedColumns];
  public columnsToDisplay: string[] = [...this.displayedColumns];
  public dataSource = new MatTableDataSource<User>([]);
  public loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.UsersService.getUsers().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

    toggleColumn(column: string) {
      const index = this.columnsToDisplay.indexOf(column);
      if (index >= 0) {
        this.columnsToDisplay.splice(index, 1);
      } else {
        const originalIndex = this.allColumns.indexOf(column);
        this.columnsToDisplay.splice(originalIndex, 0, column);
      }
    }
}
