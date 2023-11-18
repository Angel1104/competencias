import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerevenComponent } from './vereven.component';

describe('VerevenComponent', () => {
  let component: VerevenComponent;
  let fixture: ComponentFixture<VerevenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerevenComponent]
    });
    fixture = TestBed.createComponent(VerevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
