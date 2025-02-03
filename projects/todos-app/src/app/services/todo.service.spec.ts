import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { setupTestBed } from '../test-setup';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    setupTestBed({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
