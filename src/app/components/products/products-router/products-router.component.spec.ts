import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRouterComponent } from './products-router.component';

describe('ProductsRouterComponent', () => {
  let component: ProductsRouterComponent;
  let fixture: ComponentFixture<ProductsRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
