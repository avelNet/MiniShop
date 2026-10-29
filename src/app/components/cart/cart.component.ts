import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(public productService: ProductService) {}

  get items(): CartItem[] {
    return this.productService.getCart();
  }

  increase(item: CartItem): void {
    this.productService.addToCart(item.product);
  }

  decrease(item: CartItem): void {
    this.productService.decreaseQuantity(item.product.id);
  }

  remove(item: CartItem): void {
    this.productService.removeFromCart(item.product.id);
  }

  clear(): void {
    this.productService.clearCart();
  }
}
