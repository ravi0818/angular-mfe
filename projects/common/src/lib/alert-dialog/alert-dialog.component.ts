import { Component, EventEmitter, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.scss',
})
export class AlertDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AlertDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  title = signal(this.data.title);
  message = signal(this.data.message);

  onClose(): void {
    this.dialogRef.close();
  }
}
