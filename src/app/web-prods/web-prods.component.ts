import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../home/product';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-web-prods',
  templateUrl: './web-prods.component.html',
  styleUrls: ['./web-prods.component.css']
})
export class WebProdsComponent implements OnInit {
  product: Product | undefined;
  products: Product[] = [];
  filteredProds: Product[] = [];
  src: string = '';
  selectedCategory: string = '';
  categories: string[] = [];
  cart: Product[] = [];
  searchActive: boolean = false;
  private cartKey = 'cart';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe((product) => {
        this.product = product;
      },
    );
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

  addToCart(product: Product): void {
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
