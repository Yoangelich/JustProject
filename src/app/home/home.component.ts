import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'fmw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  selectedChange: string = 'all';

  constructor(private prodsvc: ProductsService) { }

  ngOnInit(): void {
    this.prodsvc.getProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
