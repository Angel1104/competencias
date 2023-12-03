import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerequiposComponent } from './verequipos.component';

describe('VerequiposComponent', () => {
  let component: VerequiposComponent;
  let fixture: ComponentFixture<VerequiposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerequiposComponent]
    });
    fixture = TestBed.createComponent(VerequiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
