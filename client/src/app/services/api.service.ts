import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API = 'http://localhost:3000/api/restaurants';

  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http.get(this.API);
  }

  getRestaurantById(id: string) {
    return this.http.get(`${this.API}/${id}`);
  }
}