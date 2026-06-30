import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { CartComponent } from './pages/cart/cart.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'contact', component: ContactComponent },

  { path: 'cart', component: CartComponent },

  { path: 'favorites', component: FavoritesComponent },

  { path: 'restaurant/:id', component: RestaurantDetailComponent }

];