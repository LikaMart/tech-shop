import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Product {
  _id: string;
  title: string;
  description: string;
  brand: string;
  thumbnail: string;
  images: string[];
  stock: number;
  rating: number;
  warranty: number;
  issueDate: string;
  price: {
    current: number;
    currency: string;
    beforeDiscount: number;
    discountPercentage: number;
  };
  category: {
    id: string;
    name: string;
    image: string;
  };
}

export interface ProductsResponse {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: Product[];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.everrest.educata.dev/shop';

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);

  getAll(pageIndex: number = 1, pageSize: number = 10) {
    this.isLoading.set(true);
    return this.http.get<ProductsResponse>(
      `${this.apiUrl}/products/all?page_index=${pageIndex}&page_size=${pageSize}`,
    );
  }

  getById(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/id/${id}`);
  }

  getByCategory(category: string) {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/products/category?name=${category}`);
  }

  search(keyword: string) {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/products/search?keywords=${keyword}`);
  }
}
