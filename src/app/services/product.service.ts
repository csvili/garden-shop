import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../models/product.model';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsCollection = this.firestore.collection<Product>('products');
  private cart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private firestore: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges({ idField: 'id' });
  }

  getProduct(id: string): Observable<Product | undefined> {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

  addProduct(product: Product): Promise<void> {
    return this.productsCollection.doc(product.id).set(product);
  }

  updateProduct(id: string, product: Product): Promise<void> {
    return this.productsCollection.doc(id).update(product);
  }

  deleteProduct(id: string): Promise<void> {
    return this.productsCollection.doc(id).delete();
  }

  // Kosár metódusok
  getCart(): Observable<Product[]> {
    return this.cart.asObservable();
  }

  addToCart(product: Product): void {
    const currentCart = this.cart.value;
    this.cart.next([...currentCart, product]);
  }

  removeFromCart(product: Product): void {
    const currentCart = this.cart.value;
    const updatedCart = currentCart.filter(p => p.id !== product.id);
    this.cart.next(updatedCart);
  }

  getTotalPrice(): Observable<number> {
    return this.cart.asObservable().pipe(
      map(products => products.reduce((total, product) => total + product.price, 0))
    );
  }

  generateId(): string {
    return this.firestore.createId();
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.firestore.collection<Product>('products', ref => ref.where('category', '==', category)).valueChanges();
  }

  getTopRatedProducts(limit: number): Observable<Product[]> {
    return this.firestore.collection<Product>('products', ref => ref.orderBy('rating', 'desc').limit(limit)).valueChanges();
  }
  
}
