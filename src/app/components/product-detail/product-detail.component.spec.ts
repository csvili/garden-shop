import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => this.productService.getProduct(params.get('id')!))
    );
  }

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addToCart(product: Product | undefined): void {
    if (product) {
      this.productService.addToCart(product);
      alert(`${product.name} a kosárba került!`);
    }
  }
}
