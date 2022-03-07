import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CorteDeCaja from '../types/CorteDeCaja';

@Injectable({
  providedIn: 'root'
})
export class CorteDeCajaService {
  private link = "http://localhost:3000/corte-de-caja"
  constructor(private http: HttpClient) { }

  public getCortes(){
    return this.http.get(this.link)
  }
}
