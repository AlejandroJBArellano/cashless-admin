import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private APIBaseURL = 'http://localhost:3000/order'
  constructor(private http: HttpClient) { }

  getAllOrders(){
    return this.http.get(this.APIBaseURL)
  }
}
