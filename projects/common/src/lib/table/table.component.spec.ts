import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { setupTestBed } from '../../test-setup';
import { signal } from '@angular/core';

const mockTableData = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Doe', age: 25 },
  { id: 3, name: 'Bob Smith', age: 40 },
];

const mockColumns = ['id', 'name', 'age'];

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await setupTestBed({
      imports: [TableComponent],
    });

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('tableData', mockTableData);
    fixture.componentRef.setInput('columns', mockColumns);
    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('customCellTemplates', {});

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');
    expect(headers.length).toBe(mockColumns.length);
    mockColumns.forEach((column, index) => {
      expect(headers[index].textContent).toContain(column.toUpperCase());
    });
  });

  it('should render table rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockTableData.length);
  });
});
