import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../interface/todo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = `${environment.backendUrl}/api/todos`;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTodoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTodo(todo: ITodo): Observable<any> {
    return this.http.post(this.apiUrl, todo);
  }

  updateTodo(id: string, todo: ITodo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, todo);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
