import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RestaurantCardComponent } from '../../restaurant-card/restaurant-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RestaurantCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {   // ✅ MUST MATCH

  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  loading = true;

  search = new FormControl('');
  location = new FormControl('');
  rating = new FormControl('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/restaurants')
      .subscribe(data => {
        this.restaurants = data;
        this.filteredRestaurants = data;
        this.loading = false;
      });

    this.search.valueChanges.subscribe(() => this.applyFilters());
    this.location.valueChanges.subscribe(() => this.applyFilters());
    this.rating.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters() {
    const searchValue = (this.search.value || '').toLowerCase();
    const locationValue = (this.location.value || '').toLowerCase();
    const ratingValue = Number(this.rating.value) || 0;

    this.filteredRestaurants = this.restaurants.filter(r =>
      (!searchValue || r.name.toLowerCase().includes(searchValue)) &&
      (!locationValue || r.location.toLowerCase().includes(locationValue)) &&
      (!ratingValue || r.rating >= ratingValue)
    );
  }
}