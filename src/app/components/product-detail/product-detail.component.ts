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

  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.productService.getProduct(params.get('id')!))
    ).subscribe(product => this.product = product);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addToCart(): void {
    if (this.product) {
      this.productService.addToCart(this.product);
      alert(`${this.product.name} a kosárba került!`);
    }
  }
}
