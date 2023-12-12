import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersviewComponent } from './usersview.component';

describe('UsersviewComponent', () => {
  let component: UsersviewComponent;
  let fixture: ComponentFixture<UsersviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersviewComponent]
    });
    fixture = TestBed.createComponent(UsersviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
