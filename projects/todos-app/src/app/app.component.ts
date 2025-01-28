import { Component, inject } from '@angular/core';
import { TodosComponent } from './todos/todos.component';

@Component({
  selector: 'app-root',
  imports: [TodosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todos-app';
}
