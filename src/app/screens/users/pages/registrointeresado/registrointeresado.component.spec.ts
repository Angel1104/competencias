import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrointeresadoComponent } from './registrointeresado.component';

describe('RegistrointeresadoComponent', () => {
  let component: RegistrointeresadoComponent;
  let fixture: ComponentFixture<RegistrointeresadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrointeresadoComponent]
    });
    fixture = TestBed.createComponent(RegistrointeresadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
