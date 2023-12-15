import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifeventComponent } from './notifevent.component';

describe('NotifeventComponent', () => {
  let component: NotifeventComponent;
  let fixture: ComponentFixture<NotifeventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifeventComponent]
    });
    fixture = TestBed.createComponent(NotifeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
