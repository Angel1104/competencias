import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroindivumssComponent } from './registroindivumss.component';

describe('RegistroindivumssComponent', () => {
  let component: RegistroindivumssComponent;
  let fixture: ComponentFixture<RegistroindivumssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroindivumssComponent]
    });
    fixture = TestBed.createComponent(RegistroindivumssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
