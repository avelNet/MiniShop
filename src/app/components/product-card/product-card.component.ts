import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DecimalPipe, NgClass, NgStyle } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [NgClass, NgStyle, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() inCart = false;

  @Output() addToCart = new EventEmitter<Product>();

  imageFailed = false;

  get finalPrice(): number {
    return Math.round(this.product.price * (1 - this.product.discount / 100));
  }

  onBuy(): void {
    this.addToCart.emit(this.product);
  }
}
