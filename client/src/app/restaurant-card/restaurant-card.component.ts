import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { FavoritesService } from '../services/favorites.service';
@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule],

 template: `

<div
  *ngIf="restaurant"
  class="custom-card"
  (click)="viewDetails()">

  <!-- IMAGE -->
  <div class="image-wrapper">

    <img
      class="restaurant-img"
      [src]="restaurant?.image
        ? 'http://localhost:3000/images/' + restaurant.image
        : 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200'">

    <!-- OFFER -->
    <div class="offer-badge">
      {{ restaurant?.offer || '50% OFF' }}
    </div>

    <!-- RATING -->
    <div class="rating-badge">
      ⭐ {{ restaurant?.rating || 4.5 }}
    </div>

    <!-- FAVORITE BUTTON (ONLY ONE) -->
    <button
      class="favorite-circle"
      (click)="addFavorite($event)">

      ❤️

    </button>

    <!-- STATUS -->
    <div
      class="status-badge"
      [ngClass]="restaurant?.isOpen ? 'open' : 'closed'">

      {{ restaurant?.isOpen ? 'OPEN' : 'CLOSED' }}

    </div>

  </div>

  <!-- BODY -->
  <div class="card-body">

    <h3 class="card-title">
      {{ restaurant?.name }}
    </h3>

    <p class="card-text">
      📍 {{ restaurant?.location }}
    </p>

    <div class="extra">

      <span>
        🍽 {{ restaurant?.cuisine || 'Multi Cuisine' }}
      </span>

      <span class="price">
        💰 ₹{{ restaurant?.price || 300 }}
      </span>

    </div>

    <!-- DELIVERY -->
    
    <!-- ACTION BUTTONS -->
   <div class="bottom-row">

  <div class="delivery">
    🚚 {{ restaurant?.deliveryTime || 30 }} mins
  </div>

  <button
    class="cart-btn"
    (click)="addToCart($event)">

    🛒 Add To Cart

  </button>

</div>
  </div>
</div>
`
,
styles: [`
  .custom-card{
  width:95%;
  margin:12px auto;
  background:#fff;
  border-radius:28px;
  overflow:hidden;
  position:relative;
  cursor:pointer;
  transition:.3s ease;
  box-shadow:0 10px 25px rgba(0,0,0,.08);
}

.custom-card:hover{
  transform:translateY(-8px);
  box-shadow:0 20px 40px rgba(0,0,0,.15);
}

.image-wrapper{
  position:relative;
  overflow:hidden;
}

.restaurant-img{
  width:100%;
  height:260px;
  object-fit:cover;
  display:block;
  transition:.4s ease;
}

.custom-card:hover .restaurant-img{
  transform:scale(1.05);
}

/* OFFER */

.offer-badge{
  position:absolute;
  top:15px;
  left:15px;
  background:#ff4d6d;
  color:white;
  padding:8px 14px;
  border-radius:20px;
  font-size:12px;
  font-weight:700;
}

/* RATING */

.rating-badge{
  position:absolute;
  top:15px;
  right:70px;
  background:white;
  color:#111;
  padding:8px 14px;
  border-radius:20px;
  font-weight:700;
  box-shadow:0 3px 10px rgba(0,0,0,.12);
}

/* FAVORITE */

.favorite-circle{
  position:absolute;
  top:15px;
  right:15px;
  width:42px;
  height:42px;
  border:none;
  border-radius:50%;
  background:white;
  font-size:18px;
  cursor:pointer;
  box-shadow:0 3px 10px rgba(0,0,0,.12);
  transition:.3s;
}

.favorite-circle:hover{
  transform:scale(1.1);
}

/* STATUS */

.status-badge{
  position:absolute;
  bottom:15px;
  left:15px;
  color:white;
  padding:8px 14px;
  border-radius:20px;
  font-size:12px;
  font-weight:700;
}

.open{
  background:#16c784;
}

.closed{
  background:#ea3943;
}

/* BODY */

.card-body{
  padding:24px;
}

.card-title{
  font-size:22px;
  font-weight:800;
  margin-bottom:10px;
  color:#111;
}

.card-text{
  color:#666;
  margin-bottom:18px;
  font-size:15px;
}

.extra{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:18px;
}

.price{
  color:#ff6b35;
  font-weight:700;
}

/* BOTTOM */

.bottom-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-top:1px solid #eee;
  padding-top:18px;
  margin-top:18px;
}

.delivery{
  font-weight:600;
  color:#444;
  font-size:16px;
}

.cart-btn{
  border:none;
  background:#ff6b35;
  color:white;
  padding:12px 20px;
  border-radius:12px;
  cursor:pointer;
  font-weight:700;
  transition:.3s;
}

.cart-btn:hover{
  background:#e95a28;
  transform:scale(1.03);
}

/* MOBILE */

@media(max-width:768px){

  .restaurant-img{
    height:220px;
  }

  .card-title{
    font-size:20px;
  }

  .bottom-row{
    flex-direction:column;
    gap:12px;
    align-items:flex-start;
  }

  .cart-btn{
    width:100%;
  }
}

  `]
})
export class RestaurantCardComponent {

  @Input() restaurant: any;

 constructor(
  private router: Router,
  private cartService: CartService,
  private favoritesService: FavoritesService
) {}

  viewDetails() {

    if (this.restaurant?._id) {

      this.router.navigate([
        '/restaurant',
        this.restaurant._id
      ]);
    }
  }

  addToCart(event: Event) {

    event.stopPropagation();

    if (!this.restaurant) return;

    this.cartService.addToCart(this.restaurant);

    alert(
      (this.restaurant.name || 'Item') +
    
      ' added to cart 🛒'
    
    
    
    
    );


  }
  addFavorite(event: Event) {

  event.stopPropagation();

  console.log('Restaurant Object:', this.restaurant);

  if (!this.restaurant) {
    console.log('Restaurant is NULL');
    return;
  }

  let favorites =
    this.favoritesService.getFavorites();

  favorites =
    this.favoritesService.toggleFavorite(
      this.restaurant,
      favorites
    );

  console.log('Favorites After Save:', favorites);

  alert(
    (this.restaurant.name || 'Restaurant') +
    ' added to favorites ❤️'
  );
}
  
}