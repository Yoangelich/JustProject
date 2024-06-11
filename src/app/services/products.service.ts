import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../home/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private getLink: string = 'https://dummyjson.com/products';
  private cart: { product: Product, quantity: number }[] = [];
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.getLink).pipe(
      map(response => response.products),
    
    );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.getLink}/${id}`;
    return this.http.get<Product>(url)
  
  }
  private items: Product[] = [];
  private cartKey = 'cart';
  
  removeFromCart(product: Product): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems: Product[] = JSON.parse(storedCart);
      const index = cartItems.findIndex(item => item.id === product.id);
      if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }
    }
  }
  AddUp(product: Product): void {
    const cartItem = this.cart.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
      
    }
  }

  AddDown(product: Product): void {
    const cartItem = this.cart.find(item => item.product.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    } else if (cartItem && cartItem.quantity === 1) {
      this.removeFromCart(product);
    }
  }
  getItems(): Product[] {
    return this.items;
  }
  addToCart(product: Product): void {
    const cartItems = this.getCart();
    cartItems.push(product);
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }
  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
  getCart(): Product[] {
    const storedCart = localStorage.getItem(this.cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  }
  
}
