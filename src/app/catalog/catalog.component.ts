import { Component, OnInit } from '@angular/core';
import { Product } from '../home/product';
import { ProductsService } from '../services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fmw-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filteredProds: Product[] = [];
  src: string = '';
  selectedCategory: string = '';
  categories: string[] = [];
  cart: Product[] = [];
  searchActive: boolean = false;
  private cartKey = 'cart';

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProds = products;
      this.categories = [...new Set(products.map(product => product.category))];
    });
  }

  sweetalert2() {
    Swal.fire({
      title: "Product Has Been Added In Basket",
      text: "Go To Basket For Checkout",
      icon: "success"
    });
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

  Basket(product: Product): void {
    const existingProductIndex = this.cart.findIndex(item => item.id === product.id);
     this.sweetalert2()
    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex].quantity++;
    } else {
      const productWithQuantity: Product = { ...product, quantity: 1 };
      this.cart.push(productWithQuantity);
    }
    localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
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
