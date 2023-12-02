import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerinteresadosComponent } from './verinteresados.component';

describe('VerinteresadosComponent', () => {
  let component: VerinteresadosComponent;
  let fixture: ComponentFixture<VerinteresadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerinteresadosComponent]
    });
    fixture = TestBed.createComponent(VerinteresadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
