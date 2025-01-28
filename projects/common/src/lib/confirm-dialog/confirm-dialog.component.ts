import { Component, EventEmitter, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  title = signal(this.data.title);
  message = signal(this.data.message);

  onConfirm = new EventEmitter();

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.onConfirm.emit();
    this.dialogRef.close();
  }
}
