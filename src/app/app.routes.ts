import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: 'catalog', component: ProductListComponent, title: 'MiniShop — Каталог' },
  { path: 'cart', component: CartComponent, title: 'MiniShop — Корзина' },
  { path: '**', redirectTo: 'catalog' },
];
