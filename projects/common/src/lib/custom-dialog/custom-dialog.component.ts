import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-custom-dialog',
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './custom-dialog.component.html',
  styleUrl: './custom-dialog.component.scss',
})
export class CustomDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CustomDialogComponent>);
  readonly dialogData = inject(MAT_DIALOG_DATA);

  title = signal(this.dialogData.title);
  body = signal(this.dialogData.body);
  data = signal(this.dialogData.data);
  showHeader = signal(this.dialogData.showHeader);
  showFooter = signal(this.dialogData.showFooter);

  onConfirm = new EventEmitter();

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onDoneClick(): void {
    this.onConfirm.emit();
    this.dialogRef.close();
  }
}
