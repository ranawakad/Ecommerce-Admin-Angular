import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFulfilledOrdersComponent } from './all-fulfilled-orders.component';

describe('AllFulfilledOrdersComponent', () => {
  let component: AllFulfilledOrdersComponent;
  let fixture: ComponentFixture<AllFulfilledOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFulfilledOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFulfilledOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
