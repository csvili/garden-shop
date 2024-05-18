import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems$!: Observable<Product[]>;
  totalPrice$!: Observable<number>;

  constructor(private productService: ProductService) {
    this.totalPrice$ = this.productService.getTotalPrice().pipe(
      map(price => price ?? 0) // Kezeli a null értéket, alapértelmezett érték 0
    );
  }

  ngOnInit(): void {
    this.cartItems$ = this.productService.getCart();
  }

  removeFromCart(product: Product): void {
    this.productService.removeFromCart(product);
  }
}
