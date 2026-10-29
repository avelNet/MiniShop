import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  searchText = '';

  constructor(private productService: ProductService) {}

  get filteredProducts(): Product[] {
    const query = this.searchText.trim().toLowerCase();
    return this.productService
      .getProducts()
      .filter((p) => p.name.toLowerCase().includes(query));
  }

  isInCart(product: Product): boolean {
    return this.productService.isInCart(product.id);
  }

  onAddToCart(product: Product): void {
    this.productService.addToCart(product);
  }
}
