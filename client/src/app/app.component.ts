import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';
// ✅ COMPONENTS
import { NavbarComponent } from './navbar/navbar.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';

// ✅ SERVICES
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavbarComponent,
    RestaurantCardComponent,
     RouterOutlet
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // =========================
  // RESTAURANTS
  // =========================

  restaurants: any[] = [];
  filteredRestaurants: any[] = [];

  // =========================
  // LOADING
  // =========================

  loading: boolean = true;

  // =========================
  // FAVORITES
  // =========================

  favorites: any[] = [];

  // =========================
  // MODAL
  // =========================

  selectedRestaurant: any = null;

  // =========================
  // SEARCH FILTERS
  // =========================

  search = new FormControl('');
  location = new FormControl('');
  rating = new FormControl('');

  // =========================
  // CONSTRUCTOR
  // =========================

constructor(
  private http: HttpClient,
  private router: Router,
  private cartService: CartService,
  private favoritesService: FavoritesService
) {}
  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    // ❤️ Load favorites
   this.favorites = this.favoritesService.getFavorites();
    // =========================
    // API CALL
    // =========================

    this.http
      .get<any[]>('http://localhost:3000/api/restaurants')

      .subscribe({

       next: (data: any[]) => {
          // Add extra UI properties
          this.restaurants = data.map((r: any) => ({
            ...r,

            // Random Open/Close Status
            isOpen: Math.random() > 0.5,

            // Random Delivery Time
            deliveryTime:
              Math.floor(Math.random() * 40) + 10,

            // Random Offer
            offer:
              Math.random() > 0.5
                ? '50% OFF'
                : 'FREE DELIVERY'

          }));

          this.filteredRestaurants =
            this.restaurants;

          this.loading = false;
        },

        error: (err: any) => {

          console.error(err);

          this.loading = false;
        }
      });

    // =========================
    // FILTER SUBSCRIPTIONS
    // =========================

    this.search.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.location.valueChanges.subscribe(() => {
      this.applyFilters();
    });

    this.rating.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  // =========================
  // APPLY FILTERS
  // =========================

  applyFilters(): void {

    const searchValue =
      (this.search.value || '')
        .toLowerCase()
        .trim();

    const locationValue =
      (this.location.value || '')
        .toLowerCase()
        .trim();

    const ratingValue =
      Number(this.rating.value) || 0;

    this.filteredRestaurants =
      this.restaurants.filter(r => {

        const name =
          (r.name || '')
            .toLowerCase();

        const location =
          (r.location || '')
            .toLowerCase();

        const rating =
          r.rating || 0;

        return (

          (!searchValue ||
            name.includes(searchValue))

          &&

          (!locationValue ||
            location.includes(locationValue))

          &&

          (!ratingValue ||
            rating >= ratingValue)

        );
      });
  }

  // =========================
  // CATEGORY FILTER
  // =========================

 filterCategory(category: string): void {

  console.log("Clicked Category:", category);

  console.log("Restaurants:", this.restaurants);

  this.filteredRestaurants =
    this.restaurants.filter((restaurant: any) => {

      console.log("Restaurant Category:", restaurant.category);

      return (
        restaurant.category &&
        restaurant.category
          .toLowerCase()
          .trim() ===
        category.toLowerCase().trim()
      );

    });

  console.log(
    "Filtered:",
    this.filteredRestaurants
  );
}
  // =========================
  // SHOW ALL RESTAURANTS
  // =========================

  showAllRestaurants(): void {

    this.filteredRestaurants =
      this.restaurants;
  }

  // =========================
  // FAVORITES
  // =========================
toggleFavorite(restaurant: any): void {

  this.favorites =
    this.favoritesService.toggleFavorite(
      restaurant,
      this.favorites
    );
}

isFavorite(restaurant: any): boolean {

  return this.favoritesService.isFavorite(
    restaurant,
    this.favorites
  );
}
  // =========================
  // OPEN MODAL
  // =========================

  openRestaurant(restaurant: any): void {

    this.selectedRestaurant =
      restaurant;
  }

  // =========================
  // CLOSE MODAL
  // =========================

  closeModal(): void {

    this.selectedRestaurant =
      null;
  }

  // =========================
  // CLEAR FILTERS
  // =========================

  clearFilters(): void {

    this.search.setValue('');
    this.location.setValue('');
    this.rating.setValue('');

    this.filteredRestaurants =
      this.restaurants;
  }

  // =========================
  // TRACK BY
  // =========================

  trackByRestaurant(
    index: number,
    restaurant: any
  ): number {

    return restaurant.id;
  }
}