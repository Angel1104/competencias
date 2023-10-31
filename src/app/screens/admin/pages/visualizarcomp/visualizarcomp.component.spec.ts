import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarcompComponent } from './visualizarcomp.component';

describe('VisualizarcompComponent', () => {
  let component: VisualizarcompComponent;
  let fixture: ComponentFixture<VisualizarcompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizarcompComponent]
    });
    fixture = TestBed.createComponent(VisualizarcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
