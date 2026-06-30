import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {   // ✅ MUST MATCH IMPORT NAME

  restaurants: any[] = [];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getRestaurants().subscribe((data: any) => {
      this.restaurants = data;
    });
  }

  openRestaurant(id: string) {
    this.router.navigate(['/restaurant', id]);
  }
}