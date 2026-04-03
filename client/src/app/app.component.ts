import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Import your components
import { NavbarComponent } from './navbar/navbar.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
    RestaurantCardComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  
  restaurants: any[] = [];           // All restaurants from backend
  filteredRestaurants: any[] = [];   // Restaurants after applying filters

  // Form controls for filters
  search = new FormControl('');
  location = new FormControl('');
  rating = new FormControl('');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch restaurant data from backend
    this.http.get<any[]>('http://localhost:3000/api/restaurants')
      .subscribe(data => {
        this.restaurants = data;
        this.filteredRestaurants = data; // Initially, show all
      });

    // Subscribe to filter changes
    this.search.valueChanges.subscribe(() => this.applyFilters());
    this.location.valueChanges.subscribe(() => this.applyFilters());
    this.rating.valueChanges.subscribe(() => this.applyFilters());
  }

  // Filter logic
  applyFilters() {
    this.filteredRestaurants = this.restaurants.filter(r => {
      const searchValue = this.search.value?.toLowerCase() || '';
      const locationValue = this.location.value?.toLowerCase() || '';
      const ratingValue = this.rating.value;

      const matchesSearch = !searchValue || r.name.toLowerCase().includes(searchValue);
      const matchesLocation = !locationValue || r.location.toLowerCase().includes(locationValue);
      const matchesRating = !ratingValue || r.rating >= ratingValue;

      return matchesSearch && matchesLocation && matchesRating;
    });
  }
}