import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  items: any[] = [];

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {

    this.items =
      this.cartService.getCartItems();
  }

  remove(index: number): void {

    this.cartService.removeItem(index);

    this.items =
      this.cartService.getCartItems();
  }
}