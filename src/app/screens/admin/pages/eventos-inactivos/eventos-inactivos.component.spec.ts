import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosInactivosComponent } from './eventos-inactivos.component';

describe('EventosInactivosComponent', () => {
  let component: EventosInactivosComponent;
  let fixture: ComponentFixture<EventosInactivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventosInactivosComponent]
    });
    fixture = TestBed.createComponent(EventosInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
