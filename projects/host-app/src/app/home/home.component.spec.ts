import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { setupTestBed } from '../test-setup';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await setupTestBed({
      imports: [HomeComponent],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have text "home work!', () => {
    const text = fixture.nativeElement.querySelector('p');
    expect(text.textContent).toContain('home works!');
  });
});
