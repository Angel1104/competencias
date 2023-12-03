import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerparticipantesComponent } from './verparticipantes.component';

describe('VerparticipantesComponent', () => {
  let component: VerparticipantesComponent;
  let fixture: ComponentFixture<VerparticipantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerparticipantesComponent]
    });
    fixture = TestBed.createComponent(VerparticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
