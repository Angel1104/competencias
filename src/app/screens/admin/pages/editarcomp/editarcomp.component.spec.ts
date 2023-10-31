import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcompComponent } from './editarcomp.component';

describe('EditarcompComponent', () => {
  let component: EditarcompComponent;
  let fixture: ComponentFixture<EditarcompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarcompComponent]
    });
    fixture = TestBed.createComponent(EditarcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
