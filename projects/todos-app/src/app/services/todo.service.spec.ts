import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { setupTestBed } from '../test-setup';

const mockTodo = {
  title: 'Test Todo',
  description: 'Test Description',
  completed: false,
  dueDate: new Date(),
};

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    setupTestBed({});
    service = TestBed.inject(TodoService);
  });

  it('should be created TodoService', () => {
    expect(service).toBeTruthy();
  });

  it('should create todo', (done) => {
    service.createTodo(mockTodo).subscribe({
      next: (todo) => {
        expect(todo.title).toBe(mockTodo.title);
        expect(todo.description).toBe(mockTodo.description);
        expect(todo.completed).toBe(mockTodo.completed);
        expect(todo.dueDate).toBe(mockTodo.dueDate.toISOString());
        done();
      },
      error: (error) => {
        done.fail(error);
      },
    });
  });

  it('should get all todos and then get the last one by id', (done) => {
    service.getTodos().subscribe({
      next: (todos) => {
        expect(todos.length).toBeGreaterThan(0);

        const lastTodo = todos[todos.length - 1];

        service.getTodoById(lastTodo._id).subscribe({
          next: (todoById) => {
            expect(todoById._id).toBe(lastTodo._id);
            expect(todoById.title).toBe(lastTodo.title);
            done();
          },
          error: (error) => {
            done.fail(error);
          },
        });
      },
      error: (error) => {
        done.fail(error);
      },
    });
  });

  it('should get all todos and update the last one', (done) => {
    service.getTodos().subscribe({
      next: (todos) => {
        expect(todos.length).toBeGreaterThan(0);

        const lastTodo = todos[todos.length - 1];
        const updatedTodo = { ...lastTodo, title: 'Updated Title' };

        service.updateTodo(lastTodo._id, updatedTodo).subscribe({
          next: (updated) => {
            expect(updated.title).toBe('Updated Title');
            done();
          },
          error: (error) => {
            done.fail(error);
          },
        });
      },
      error: (error) => {
        done.fail(error);
      },
    });
  });

  it('should get all todos and delete the last one', (done) => {
    service.getTodos().subscribe({
      next: (todos) => {
        expect(todos.length).toBeGreaterThan(0);

        const lastTodo = todos[todos.length - 1];

        service.deleteTodo(lastTodo._id).subscribe({
          next: (response) => {
            expect(response.message).toBe('Todo deleted successfully');
            done();
          },
          error: (error) => {
            done.fail(error);
          },
        });
      },
      error: (error) => {
        done.fail(error);
      },
    });
  });
});
