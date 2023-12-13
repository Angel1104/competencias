import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrointeresadoumssComponent } from './registrointeresadoumss.component';

describe('RegistrointeresadoumssComponent', () => {
  let component: RegistrointeresadoumssComponent;
  let fixture: ComponentFixture<RegistrointeresadoumssComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrointeresadoumssComponent]
    });
    fixture = TestBed.createComponent(RegistrointeresadoumssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
