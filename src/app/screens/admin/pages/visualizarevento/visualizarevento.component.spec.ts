import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizareventoComponent } from './visualizarevento.component';

describe('VisualizareventoComponent', () => {
  let component: VisualizareventoComponent;
  let fixture: ComponentFixture<VisualizareventoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualizareventoComponent]
    });
    fixture = TestBed.createComponent(VisualizareventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
