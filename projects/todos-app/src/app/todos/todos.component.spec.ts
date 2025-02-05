import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { TodosComponent } from './todos.component';
import { setupTestBed } from '../test-setup';
import { By } from '@angular/platform-browser';
import { ITodo } from '../interface/todo';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TodoService } from '../services/todo.service';
import { of, throwError } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';

const mockTodos: ITodo[] = [
  {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    dueDate: new Date(),
  },
];

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let overlayContainerElement: HTMLElement;
  let todoService: jasmine.SpyObj<TodoService>;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(async () => {
    await setupTestBed({
      imports: [TodosComponent],
      providers: [
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          },
        },
      ],
    });
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
    breakpointObserver = TestBed.inject(
      BreakpointObserver
    ) as jasmine.SpyObj<BreakpointObserver>;

    fixture.detectChanges();
  });

  it('should create TodosComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have Todos title', () => {
    const title = fixture.debugElement.query(By.css('h3')).nativeElement;

    expect(title.textContent).toBe('Todos');
  });

  it('should open dialog on add button click', () => {
    let dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).toBeNull();

    component.openAddDialog();

    fixture.detectChanges();

    let dialogContainer2 = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer2).not.toBeNull();
  });

  it('should open dialog on edit button click', () => {
    let dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).toBeNull();

    component.openEditDialog(mockTodos[0]);

    fixture.detectChanges();

    let dialogContainer2 = overlayContainerElement.querySelectorAll(
      'mat-dialog-container'
    );

    expect(dialogContainer2).not.toBeNull();
  });

  it('should open confirmbox on delete button click', () => {
    let dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).toBeNull();

    component.deleteTodo(mockTodos[0].id ?? '');

    fixture.detectChanges();

    let dialogContainer2 = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer2).not.toBeNull();
  });

  it('should close confirmbox on No button click', () => {
    let dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).toBeNull();

    component.deleteTodo(mockTodos[0].id ?? '');

    fixture.detectChanges();

    let dialogContainerButtons =
      overlayContainerElement.querySelectorAll('button');

    dialogContainerButtons[0].click();

    fixture.detectChanges();

    dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).not.toBeNull();
  });

  it('should close confirmbox on Yes button click', () => {
    spyOn(todoService, 'deleteTodo').and.returnValue(of(true));
    let dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).toBeNull();

    component.deleteTodo(mockTodos[0].id ?? '');

    fixture.detectChanges();

    let dialogContainerButtons =
      overlayContainerElement.querySelectorAll('button');

    dialogContainerButtons[1].click();

    fixture.detectChanges();

    dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).not.toBeNull();
  });

  it('should create todo on add button click', () => {
    spyOn(todoService, 'createTodo').and.returnValue(of(true));
    spyOn(component, 'validateForm').and.returnValue(true);
    let dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).toBeNull();

    component.openAddDialog();

    fixture.detectChanges();

    let buttons = overlayContainerElement.querySelectorAll('button');

    const addButton = Array.from(buttons).find(
      (btn) => btn.textContent?.trim() === 'Add'
    ) as HTMLButtonElement;

    addButton.click();

    expect(todoService.createTodo).toHaveBeenCalled();
  });

  it('should not create todo  if form is not valid', () => {
    spyOn(todoService, 'createTodo').and.returnValue(of(true));
    spyOn(component, 'validateForm').and.returnValue(false);

    component.addTodoItem();

    expect(todoService.createTodo).not.toHaveBeenCalled();
  });

  it('should handle error if create todos fails', fakeAsync(() => {
    spyOn(todoService, 'createTodo').and.returnValue(
      throwError(() => new Error('Something went wrong!'))
    );
    spyOn(component, 'validateForm').and.returnValue(true);
    spyOn(console, 'error').and.callThrough();

    component.openAddDialog();
    fixture.detectChanges();
    component.addTodoItem();
    tick();

    expect(console.error).toHaveBeenCalledWith('Error creating todo');
  }));

  it('should update todo on update button click', () => {
    spyOn(todoService, 'updateTodo').and.returnValue(of(true));
    spyOn(component, 'validateForm').and.returnValue(true);
    let dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).toBeNull();

    component.openEditDialog(mockTodos[0]);

    fixture.detectChanges();

    let buttons = overlayContainerElement.querySelectorAll('button');

    const addButton = Array.from(buttons).find(
      (btn) => btn.textContent?.trim() === 'Update'
    ) as HTMLButtonElement;

    addButton.click();

    expect(todoService.updateTodo).toHaveBeenCalled();
  });

  it('should not update todo if form is not valid', () => {
    spyOn(todoService, 'updateTodo').and.returnValue(of(true));
    spyOn(component, 'validateForm').and.returnValue(false);

    component.updateTodoItem(mockTodos[0]?.id ?? '');

    expect(todoService.updateTodo).not.toHaveBeenCalled();
  });

  it('should handle error if udpdate todo fails', fakeAsync(() => {
    spyOn(todoService, 'updateTodo').and.returnValue(
      throwError(() => new Error('Something went wrong!'))
    );
    spyOn(component, 'validateForm').and.returnValue(true);
    spyOn(console, 'error').and.callThrough();

    component.openAddDialog();
    fixture.detectChanges();
    component.updateTodoItem(mockTodos[0].id ?? '');

    expect(console.error).toHaveBeenCalledWith('Error updating todo');
  }));

  it('should toggle todo state', () => {
    spyOn(todoService, 'updateTodo').and.returnValue(of(true));

    component.toggleTodo(mockTodos[0]);

    expect(todoService.updateTodo).toHaveBeenCalled();
  });

  it('should not toggle todo state if id not present', () => {
    spyOn(todoService, 'updateTodo').and.returnValue(of(true));

    const todo = { ...mockTodos[0], id: undefined };
    component.toggleTodo(todo);

    expect(todoService.updateTodo).not.toHaveBeenCalled();
  });

  it('should handle error if toggle todo fails', fakeAsync(() => {
    spyOn(todoService, 'updateTodo').and.returnValue(
      throwError(() => new Error('Something went wrong!'))
    );
    spyOn(component, 'validateForm').and.returnValue(true);
    spyOn(console, 'error').and.callThrough();

    component.openEditDialog(mockTodos[0]);
    component.toggleTodo(mockTodos[0]);

    expect(console.error).toHaveBeenCalledWith('Error toggling todo');
  }));

  it('should handle error if delete todo fails', fakeAsync(() => {
    spyOn(todoService, 'deleteTodo').and.returnValue(
      throwError(() => new Error('Something went wrong!'))
    );
    spyOn(console, 'error').and.callThrough();

    let dialogContainer = overlayContainerElement.querySelector(
      'mat-dialog-container'
    );

    expect(dialogContainer).toBeNull();

    component.deleteTodo(mockTodos[0].id ?? '');

    fixture.detectChanges();

    let dialogContainerButtons =
      overlayContainerElement.querySelectorAll('button');

    dialogContainerButtons[1].click();

    fixture.detectChanges();

    expect(console.error).toHaveBeenCalledWith('Error deleting todo');
  }));

  it('should handle error if load todo fails', fakeAsync(() => {
    spyOn(todoService, 'getTodos').and.returnValue(
      throwError(() => new Error('Something went wrong!'))
    );
    spyOn(console, 'error').and.callThrough();

    component.loadTodos();

    expect(console.error).toHaveBeenCalledWith('Error loading todos');
  }));

  it('should toggle to mobile view', () => {
    spyOn(breakpointObserver, 'observe').and.returnValue(
      of({
        matches: false,
        breakpoints: {},
      })
    );

    component.ngOnInit();

    expect(component.isMobileView()).toBeTrue();
  });

  it('should toggle to desktop view', () => {
    spyOn(breakpointObserver, 'observe').and.returnValue(
      of({
        matches: true,
        breakpoints: {},
      })
    );

    component.ngOnInit();

    expect(component.isMobileView()).not.toBeTrue();
  });
});
