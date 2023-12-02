import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroindivComponent } from './registroindiv.component';

describe('RegistroindivComponent', () => {
  let component: RegistroindivComponent;
  let fixture: ComponentFixture<RegistroindivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroindivComponent]
    });
    fixture = TestBed.createComponent(RegistroindivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
