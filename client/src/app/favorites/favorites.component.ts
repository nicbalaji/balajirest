import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  // STORE IDS
  favoriteIds: number[] = [];

  // DISPLAY FULL OBJECTS
  favoriteRestaurants: any[] = [];

  constructor(
    private favService: FavoritesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    // 1. get saved ids
    this.favoriteIds = this.favService.getFavorites();

    // 2. load all restaurants
    this.http.get<any[]>('http://localhost:3000/api/restaurants')
      .subscribe((data) => {

        // 3. filter only favorites
        this.favoriteRestaurants = data.filter(r =>
          this.favoriteIds.includes(r.id)
        );

      });
  }

  // REMOVE FAVORITE
  removeFavorite(restaurant: any): void {

    this.favoriteIds =
      this.favService.toggleFavorite(
        restaurant,
        this.favoriteIds
      );

    // update UI list
    this.favoriteRestaurants =
      this.favoriteRestaurants.filter(r =>
        this.favoriteIds.includes(r.id)
      );
  }
}