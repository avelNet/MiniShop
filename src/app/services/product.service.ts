import { Injectable } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

const CART_STORAGE_KEY = 'minishop-cart';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Беспроводные наушники',
      price: 5990,
      description: 'Bluetooth 5.3, шумоподавление, до 30 часов работы.',
      image: 'https://picsum.photos/seed/headphones/400/300',
      category: 'Электроника',
      inStock: true,
      discount: 20,
    },
    {
      id: 2,
      name: 'Смарт-часы',
      price: 12490,
      description: 'Пульсометр, GPS, уведомления со смартфона.',
      image: 'https://picsum.photos/seed/watch/400/300',
      category: 'Электроника',
      inStock: true,
      discount: 0,
    },
    {
      id: 3,
      name: 'Рюкзак городской',
      price: 3490,
      description: 'Влагозащищённая ткань, отделение для ноутбука 15".',
      image: 'https://picsum.photos/seed/backpack/400/300',
      category: 'Аксессуары',
      inStock: false,
      discount: 0,
    },
    {
      id: 4,
      name: 'Кофемолка',
      price: 2790,
      description: 'Жерновой механизм, 15 степеней помола.',
      image: 'https://picsum.photos/seed/coffee/400/300',
      category: 'Для дома',
      inStock: true,
      discount: 15,
    },
    {
      id: 5,
      name: 'Настольная лампа',
      price: 1990,
      description: 'LED, регулировка яркости и цветовой температуры.',
      image: 'https://picsum.photos/seed/lamp/400/300',
      category: 'Для дома',
      inStock: true,
      discount: 0,
    },
    {
      id: 6,
      name: 'Кроссовки беговые',
      price: 7990,
      description: 'Лёгкая амортизирующая подошва, дышащий верх.',
      image: 'https://picsum.photos/seed/sneakers/400/300',
      category: 'Одежда и обувь',
      inStock: false,
      discount: 30,
    },
    {
      id: 7,
      name: 'Механическая клавиатура',
      price: 6490,
      description: 'Горячая замена переключателей, RGB-подсветка.',
      image: 'https://picsum.photos/seed/keyboard/400/300',
      category: 'Электроника',
      inStock: true,
      discount: 10,
    },
    {
      id: 8,
      name: 'Термокружка',
      price: 990,
      description: 'Держит тепло до 8 часов, объём 450 мл.',
      image: 'https://picsum.photos/seed/mug/400/300',
      category: 'Аксессуары',
      inStock: true,
      discount: 0,
    },
  ];

  private cart: CartItem[] = this.loadCart();

  // ----- Товары -----

  getProducts(): Product[] {
    return this.products;
  }

  getFinalPrice(product: Product): number {
    return Math.round(product.price * (1 - product.discount / 100));
  }

  // ----- Корзина -----

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    if (!product.inStock) {
      return;
    }
    const item = this.cart.find((i) => i.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.saveCart();
  }

  decreaseQuantity(productId: number): void {
    const item = this.cart.find((i) => i.product.id === productId);
    if (!item) {
      return;
    }
    item.quantity--;
    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.saveCart();
    }
  }

  removeFromCart(productId: number): void {
    const index = this.cart.findIndex((i) => i.product.id === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveCart();
    }
  }

  clearCart(): void {
    this.cart.splice(0, this.cart.length);
    this.saveCart();
  }

  isInCart(productId: number): boolean {
    return this.cart.some((i) => i.product.id === productId);
  }

  getCartCount(): number {
    return this.cart.reduce((sum, i) => sum + i.quantity, 0);
  }

  getCartTotal(): number {
    return this.cart.reduce((sum, i) => sum + this.getFinalPrice(i.product) * i.quantity, 0);
  }

  // ----- Бонус: сохранение корзины в localStorage -----

  private saveCart(): void {
    try {
      const data = this.cart.map((i) => ({ id: i.product.id, quantity: i.quantity }));
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage недоступен (например, приватный режим) — просто не сохраняем
    }
  }

  private loadCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const data: { id: number; quantity: number }[] = JSON.parse(raw);
      // Восстанавливаем ссылки на актуальные объекты товаров по id
      return data
        .map((d) => ({ product: this.products.find((p) => p.id === d.id), quantity: d.quantity }))
        .filter((i): i is CartItem => !!i.product && i.quantity > 0);
    } catch {
      return [];
    }
  }
}
