import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { setupTestBed } from '../../test-setup';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { AsyncPipe } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await setupTestBed({
      imports: [HeaderComponent],
      provides: [
        MatButtonModule,
        RouterLink,
        MatBadgeModule,
        MatIconModule,
        AsyncPipe,
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have "Dashboard" link active when the route is "/"', () => {
    spyOn(component, 'currentRoute').and.returnValue('/');

    fixture.detectChanges();

    const activeLink = fixture.debugElement.query(By.css('a[routerLink="/"]'));
    expect(activeLink.classes['bg-gray-900']).toBeTrue();
    expect(activeLink.classes['text-white']).toBeTrue();
  });

  it('should have "Todos" link active when the route is "/todos"', () => {
    spyOn(component, 'currentRoute').and.returnValue('/todos');

    fixture.detectChanges();

    const activeLink = fixture.debugElement.query(
      By.css('a[routerLink="/todos"]')
    );
    expect(activeLink.classes['bg-gray-900']).toBeTrue();
    expect(activeLink.classes['text-white']).toBeTrue();
  });

  it('should have "Shopping" link active when the route is "/shopping"', () => {
    spyOn(component, 'currentRoute').and.returnValue('/shopping');

    fixture.detectChanges();

    const activeLink = fixture.debugElement.query(
      By.css('a[routerLink="/shopping"]')
    );

    expect(activeLink.classes['bg-gray-900']).toBeTrue();
    expect(activeLink.classes['text-white']).toBeTrue();
  });

  it('should have "Cart" icon in header', () => {
    const cartIcon = fixture.debugElement.query(By.css('mat-icon'));

    expect(cartIcon).not.toBeNull();
  });

  it('should toggle the menu on button click', () => {
    spyOn(component, 'toggleMenu').and.callThrough();
    const menuButton = fixture.debugElement.query(
      By.css('mat-icon')
    ).nativeElement;

    const initialState = component.isMenuOpen();

    menuButton.click();

    fixture.detectChanges();

    expect(component.toggleMenu).toHaveBeenCalled();
    expect(component.isMenuOpen()).toBe(!initialState);
  });

  it('should navigate to todos on Todos click', async () => {
    spyOn(component.isMenuOpen, 'set');
    spyOn(component.currentRoute, 'set');
    const todosLink = fixture.debugElement.query(
      By.css('a[routerLink="/todos"]')
    ).nativeElement;

    todosLink.click();

    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.isMenuOpen.set).toHaveBeenCalledWith(false);
    expect(component.currentRoute.set).toHaveBeenCalledWith('/todos');
  });

  it('should navigate to shopping on Shopping click', async () => {
    spyOn(component.isMenuOpen, 'set');
    spyOn(component.currentRoute, 'set');
    const shoppingLink = fixture.debugElement.query(
      By.css('a[routerLink="/shopping"]')
    ).nativeElement;

    shoppingLink.click();

    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.isMenuOpen.set).toHaveBeenCalledWith(false);
    expect(component.currentRoute.set).toHaveBeenCalledWith('/shopping');
  });
});
