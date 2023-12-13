import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroequipoumssComponent } from './registroequipoumss.component';

describe('RegistroequipoumssComponent', () => {
  let component: RegistroequipoumssComponent;
  let fixture: ComponentFixture<RegistroequipoumssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroequipoumssComponent]
    });
    fixture = TestBed.createComponent(RegistroequipoumssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
