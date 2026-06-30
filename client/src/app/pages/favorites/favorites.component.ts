import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: any[] = [];

  constructor(
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {

    this.favorites =
      this.favoritesService.getFavorites();

    console.log('Favorites:', this.favorites);
  }

  removeFavorite(id: any): void {

    this.favorites =
      this.favoritesService.removeFavorite(id);
  }
}