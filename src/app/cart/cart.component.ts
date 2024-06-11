import { Component, OnInit } from '@angular/core';
import { Product } from '../home/product';
import { ProductsService } from '../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  products: Product[] = [];
  filteredProds: Product[] = [];
  src: string = '';
  selectedCategory: string = '';
  categories: string[] = [];
  searchActive: boolean = false;
  private cartKey = 'cart';

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.loadCartFromLocalStorage();
  }

  loadCartFromLocalStorage(): void {
    this.cart = this.productService.getCart();
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter(item => item !== product);
    this.productService.removeFromCart(product);
  }

  AddDown(product: Product): void {
    product.quantity++;
  }

  AddUp(product: Product): void {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      this.removeFromCart(product);
    }
  }

  calculateTotalPrice(product: Product): number {
    return product.price * product.quantity;
  }

  buyNow(): void {
    if (this.cart.length > 0) {
      Swal.fire('Checkout', 'Proceeding to checkout!', 'success');
      this.clearCart();
    } else {
      Swal.fire('There Are No Products In Basket', 'Add Products In Basket For Checkout', 'error');
    }
  }

  clearCart(): void {
    this.cart = [];
    this.productService.clearCart();
  }
  search(): void {
    if (this.src.trim() !== '') {
      this.filteredProds = this.products.filter(product =>
        product.title.toLowerCase().includes(this.src.toLowerCase())
      );
      this.searchActive = true;
    } else {
      this.filteredProds = this.products;
      this.searchActive = false;
    }
  }

  clearSearch(): void {
    this.src = '';
    this.filteredProds = this.products;
    this.searchActive = false;
  }



  filter(): void {
    if (this.selectedCategory === '') {
      this.filteredProds = this.products;
      this.searchActive = false;
    } else {
      this.filteredProds = this.products.filter(product =>
        product.category === this.selectedCategory
      );
      this.searchActive = true;
    }
  }

  saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCartItems(): Product[] {
    return this.cart;
  }
}
