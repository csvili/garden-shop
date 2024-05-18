import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  };
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
