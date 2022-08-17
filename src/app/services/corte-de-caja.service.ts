import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorteDeCajaService {
  api = environment.api
  private link = `${environment.api}/corte-de-caja`
  constructor(private http: HttpClient) { }

  public getCortes(){
    return this.http.get(this.link)
  }
}
