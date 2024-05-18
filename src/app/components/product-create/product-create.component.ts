import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {
  product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  };

  constructor(private productService: ProductService, private router: Router) { }

  addProduct() {
    this.product.id = this.productService.generateId();
    this.productService.addProduct(this.product).then(() => {
      this.router.navigate(['/products']);
    });
  }
}
