import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUnfulfilledOrdersComponent } from './all-unfulfilled-orders.component';

describe('AllUnfulfilledOrdersComponent', () => {
  let component: AllUnfulfilledOrdersComponent;
  let fixture: ComponentFixture<AllUnfulfilledOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllUnfulfilledOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUnfulfilledOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
