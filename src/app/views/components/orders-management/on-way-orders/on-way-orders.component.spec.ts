import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnWayOrdersComponent } from './on-way-orders.component';

describe('OnWayOrdersComponent', () => {
  let component: OnWayOrdersComponent;
  let fixture: ComponentFixture<OnWayOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnWayOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnWayOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
