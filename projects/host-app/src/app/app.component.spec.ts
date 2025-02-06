import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { setupTestBed } from './test-setup';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await setupTestBed({
      imports: [AppComponent],
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain route for / (home)', () => {
    expect(routes.some((route) => route.path === '')).toBeTrue();
  });

  it('should load HomeComponent for the empty path', waitForAsync(async () => {
    const homeRoute = routes.find((route) => route.path === '');
    expect(homeRoute).toBeDefined();

    if (homeRoute && homeRoute.loadComponent) {
      const component = await homeRoute.loadComponent();
      expect(component).toBe(HomeComponent);
    }
  }));

  it('should contain route for /todos', () => {
    expect(routes.some((route) => route.path === 'todos')).toBeTrue();
  });

  it('should contain route for /shopping', () => {
    expect(routes.some((route) => route.path === 'shopping')).toBeTrue();
  });
});
