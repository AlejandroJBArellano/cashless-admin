import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private APIBaseURL = `${environment.api}/order`
  constructor(private http: HttpClient) { }

  getAllOrders(){
    return this.http.get(this.APIBaseURL)
  }
}
