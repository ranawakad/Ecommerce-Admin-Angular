import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernoratesRouterComponent } from './governorates-router.component';

describe('GovernoratesRouterComponent', () => {
  let component: GovernoratesRouterComponent;
  let fixture: ComponentFixture<GovernoratesRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernoratesRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernoratesRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
