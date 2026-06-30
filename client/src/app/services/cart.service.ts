import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: any[] = [];

  addToCart(item: any) {

    if (typeof window === 'undefined') {
      return;
    }

    const items = this.getCartItems();
    items.push(item);

    localStorage.setItem(
      'cart',
      JSON.stringify(items)
    );
  }

  getCartItems(): any[] {

    if (typeof window === 'undefined') {
      return [];
    }

    return JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
  }

  removeItem(index: number) {

    if (typeof window === 'undefined') {
      return;
    }

    const items = this.getCartItems();

    items.splice(index, 1);

    localStorage.setItem(
      'cart',
      JSON.stringify(items)
    );
  }
}