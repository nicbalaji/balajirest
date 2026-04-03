import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api/foods';

  constructor(private http: HttpClient) {}

  getFoods(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getFoodById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}