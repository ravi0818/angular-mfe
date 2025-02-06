import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomDialogComponent } from './custom-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { setupTestBed } from '../../test-setup';

describe('CustomDialogComponent', () => {
  let component: CustomDialogComponent;
  let fixture: ComponentFixture<CustomDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CustomDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await setupTestBed({
      imports: [CustomDialogComponent, MatButtonModule, CommonModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(CustomDialogComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when Close is called', () => {
    component.onCloseClick();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should close the dialog when Done is called', () => {
    spyOn(component.onConfirm, 'emit');

    component.onDoneClick();
    expect(component.onConfirm.emit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
