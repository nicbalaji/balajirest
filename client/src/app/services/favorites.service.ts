import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private key = 'favorites';

  // GET FAVORITES
  getFavorites(): any[] {

    if (typeof window === 'undefined') {
      return [];
    }

    return JSON.parse(
      localStorage.getItem(this.key) || '[]'
    );
  }

  // SAVE FAVORITES
  saveFavorites(favs: any[]): void {

    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(
      this.key,
      JSON.stringify(favs)
    );
  }

  // TOGGLE FAVORITE
  toggleFavorite(
    restaurant: any,
    currentFavs: any[]
  ): any[] {

    const favs = [...currentFavs];

    const restaurantId =
      restaurant._id || restaurant.id;

    const index = favs.findIndex(
      (item: any) =>
        (item._id || item.id) === restaurantId
    );

    if (index === -1) {

      favs.push(restaurant);

    } else {

      favs.splice(index, 1);

    }

    this.saveFavorites(favs);

    return favs;
  }

  // CHECK FAVORITE
  isFavorite(
    restaurant: any,
    currentFavs: any[]
  ): boolean {

    const restaurantId =
      restaurant._id || restaurant.id;

    return currentFavs.some(
      (item: any) =>
        (item._id || item.id) === restaurantId
    );
  }

  // REMOVE FAVORITE
  removeFavorite(id: any): any[] {

    const favs = this.getFavorites().filter(
      (item: any) =>
        (item._id || item.id) !== id
    );

    this.saveFavorites(favs);

    return favs;
  }

  // CLEAR ALL
  clearFavorites(): void {

    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem(this.key);
  }
}