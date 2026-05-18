import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductCardComponent } from './product-card';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = {
      _id: '1',
      title: 'Test Product',
      description: 'Test description',
      brand: 'Test Brand',
      thumbnail: 'https://placehold.co/150',
      images: ['https://placehold.co/150'],
      stock: 10,
      rating: 4.5,
      warranty: 12,
      issueDate: '2026-01-01',
      price: {
        current: 100,
        currency: 'GEL',
        beforeDiscount: 120,
        discountPercentage: 20,
      },
      category: {
        id: 'cat-1',
        name: 'Electronics',
        image: 'https://placehold.co/150',
      },
    };
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
