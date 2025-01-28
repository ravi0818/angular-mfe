import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../interface/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://ec2-3-7-46-232.ap-south-1.compute.amazonaws.com:5000/api/todos';

  constructor(private http: HttpClient) {}

  // Get all todos
  getTodos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Get todo by ID
  getTodoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create a new todo
  createTodo(todo: ITodo): Observable<any> {
    return this.http.post(this.apiUrl, todo);
  }

  // Update todo by ID
  updateTodo(id: string, todo: ITodo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, todo);
  }

  // Delete todo by ID
  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
