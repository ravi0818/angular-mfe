import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { setupTestBed } from './test-setup';

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
});
