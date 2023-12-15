import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifcompComponent } from './notifcomp.component';

describe('NotifcompComponent', () => {
  let component: NotifcompComponent;
  let fixture: ComponentFixture<NotifcompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifcompComponent]
    });
    fixture = TestBed.createComponent(NotifcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
