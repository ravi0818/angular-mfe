import { Component, EventEmitter, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoService } from '../../services/todo.service';
import { ITodo } from '../../interface/todo';
import { ConfirmDialogComponent } from 'common';

@Component({
  selector: 'app-todo-item',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todoService = inject(TodoService);
  todo = input.required<ITodo>();

  onEditClick = output<ITodo>();
  onToggle = output<ITodo>();
  onDelete = output<string>();

  dialog = inject(MatDialog);
}
