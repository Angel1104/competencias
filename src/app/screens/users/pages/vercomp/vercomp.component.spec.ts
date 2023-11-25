import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VercompComponent } from './vercomp.component';

describe('VercompComponent', () => {
  let component: VercompComponent;
  let fixture: ComponentFixture<VercompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VercompComponent]
    });
    fixture = TestBed.createComponent(VercompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
