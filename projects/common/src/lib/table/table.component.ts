import {
  Component,
  effect,
  ViewChild,
  input,
  TemplateRef,
  signal,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginator,
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule,
    MatSortModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  tableData = input.required<unknown[]>();
  columns = input.required<string[]>();
  isLoading = input.required<boolean>();
  customCellTemplates = input.required<Record<string, TemplateRef<any>>>();
  customCellRenderer!: Record<string, TemplateRef<any>>;
  customCellColumns = signal<string[]>([]);

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<unknown>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      const data = this.tableData();
      this.dataSource.data = data;
      this.displayedColumns = this.columns();
    });
    effect(() => {
      this.customCellRenderer = this.customCellTemplates();
      this.customCellColumns.set(Object.keys(this.customCellRenderer));
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
