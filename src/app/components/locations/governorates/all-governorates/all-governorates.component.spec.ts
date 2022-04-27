import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGovernoratesComponent } from './all-governorates.component';

describe('AllGovernoratesComponent', () => {
  let component: AllGovernoratesComponent;
  let fixture: ComponentFixture<AllGovernoratesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGovernoratesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllGovernoratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
