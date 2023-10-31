import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcompComponent } from './crearcomp.component';

describe('CrearcompComponent', () => {
  let component: CrearcompComponent;
  let fixture: ComponentFixture<CrearcompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearcompComponent]
    });
    fixture = TestBed.createComponent(CrearcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
