import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  sortedProducts$: Observable<Product[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getProducts();
    this.sortedProducts$ = this.products$;
  }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
    this.sortedProducts$ = this.products$;
  }

  sortProducts(criteria: string) {
    this.sortedProducts$ = this.products$.pipe(
      map(products => {
        return products.sort((a, b) => {
          if (criteria === 'name') {
            return a.name.localeCompare(b.name);
          } else if (criteria === 'price') {
            return a.price - b.price;
          } else {
            return 0;
          }
        });
      })
    );
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
