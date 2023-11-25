import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomComponent } from './hom.component';

describe('HomComponent', () => {
  let component: HomComponent;
  let fixture: ComponentFixture<HomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomComponent]
    });
    fixture = TestBed.createComponent(HomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
