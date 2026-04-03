import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-card',
  template: `
    <div class="card shadow"
         (click)="viewDetails()">

      <img [src]="'assets/images/' + restaurant.image"
           class="card-img-top"
           height="200">
      
      <div class="card-body">
        <h5>{{restaurant.name}}</h5>
        <p>{{restaurant.location}}</p>
        <span class="badge bg-success">⭐ {{restaurant.rating}}</span>
      </div>
    </div>
  `,
  standalone: true
})
export class RestaurantCardComponent {

  @Input() restaurant: any;

  constructor(private router: Router) {}

  viewDetails() {
    this.router.navigate(['/restaurant', this.restaurant._id]);
  }
}