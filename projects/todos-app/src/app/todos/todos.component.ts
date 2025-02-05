import {
  Component,
  computed,
  effect,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  BreakpointObserver,
  BreakpointState,
  LayoutModule,
} from '@angular/cdk/layout';
import { TodoItemComponent } from '../components/todo-item/todo-item.component';
import { TodoService } from '../services/todo.service';
import { ConfirmDialogComponent, CustomDialogComponent } from 'common';
import { ITodo } from '../interface/todo';

@Component({
  selector: 'app-todos',
  imports: [
    TodoItemComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTimepickerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    LayoutModule,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  todoService = inject(TodoService);
  breakpointObserver = inject(BreakpointObserver);
  todos = signal<ITodo[]>([]);

  readonly title = new FormControl('', [Validators.required]);
  readonly description = new FormControl('', [Validators.required]);
  readonly dueDate = new FormControl('', [Validators.required]);
  requiredError = 'This field is required';
  emailError = 'Please enter a valid email address';

  @ViewChild('todoFormTemplate')
  todoFormTemplate!: TemplateRef<any>;

  dialogRef!: MatDialogRef<CustomDialogComponent, any>;

  dialog = inject(MatDialog);

  isEditingMode = signal(false);

  isMobileView = signal(false);

  ngOnInit() {
    this.loadTodos();
    this.breakpointObserver
      .observe(['(min-width: 640px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobileView.set(false);
        } else {
          this.isMobileView.set(true);
        }
      });
  }

  validateForm() {
    if (
      this.title.invalid ||
      this.description.invalid ||
      this.dueDate.invalid
    ) {
      return false;
    } else {
      return true;
    }
  }

  resetFormFields() {
    this.title.reset();
    this.description.reset();
    this.dueDate.reset();
  }

  transformData(data: any[]) {
    return data.map((item) => {
      return {
        id: item._id,
        title: item.title,
        description: item.description,
        completed: item.completed,
        dueDate: item.dueDate,
      };
    });
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos.set(this.transformData(data));
      },
      error: (error) => {
        console.error('Error loading todos');
      },
    });
  }

  addTodoItem() {
    if (!this.validateForm()) return;
    const newTodo: ITodo = {
      title: this.title.value ?? '',
      description: this.description.value ?? '',
      completed: false,
      dueDate: new Date(this.dueDate.value ?? ''),
    };

    this.todoService.createTodo(newTodo).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (error) => {
        console.error('Error creating todo');
      },
    });

    this.dialogRef.close();
  }

  updateTodoItem(todoId: string) {
    if (!this.validateForm()) return;

    const updatedTodo: ITodo = {
      title: this.title.value ?? '',
      description: this.description.value ?? '',
      completed: false,
      dueDate: new Date(this.dueDate.value ?? ''),
    };

    this.todoService.updateTodo(todoId, updatedTodo).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: (error) => {
        console.error('Error updating todo');
      },
    });

    this.dialogRef.close();
  }

  openAddDialog() {
    this.dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Add Todo',
        body: this.todoFormTemplate,
      },
      width: this.isMobileView() ? '90%' : '30%',
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.resetFormFields();
      this.isEditingMode.set(false);
    });
  }

  openEditDialog(todo: any) {
    this.isEditingMode.set(true);
    this.title.setValue(todo.title);
    this.description.setValue(todo.description);
    this.dueDate.setValue(todo.dueDate);

    this.dialogRef = this.dialog.open(CustomDialogComponent, {
      data: {
        title: 'Edit Todo',
        body: this.todoFormTemplate,
        data: todo,
      },
      width: this.isMobileView() ? '90%' : '30%',
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.resetFormFields();
      this.isEditingMode.set(false);
    });
  }

  toggleTodo = (todo: ITodo) => {
    if (!todo.id) {
      return;
    }
    this.todoService
      .updateTodo(todo.id, {
        ...todo,
        completed: !todo.completed,
      })
      .subscribe({
        next: () => {
          this.loadTodos();
        },
        error: (error) => {
          console.error('Error toggling todo');
        },
      });
  };

  deleteTodo = (todoId: string) => {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete this item?',
      },
    });

    dialogRef.componentInstance.onConfirm.subscribe(() => {
      this.todoService.deleteTodo(todoId).subscribe({
        next: () => {
          this.loadTodos();
        },
        error: (error) => {
          console.error('Error deleting todo');
        },
      });
    });
  };
}
