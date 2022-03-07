import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Item from '../types/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private link = 'http://localhost:3000/item';
  constructor(private http: HttpClient) {}

  createItem(item: Item){
    return this.http.post(this.link, item );
  }

  getItems(){
    return this.http.get(this.link);
  }

  getItemsByProductName(productName: string){
    return this.http.get(this.link, {
      params: {
        name: productName
      }
    })
  }
  changeItem(item: Item){
    return this.http.put(this.link, item);
  }
  deleteItem(_id: string){
    return this.http.delete(this.link, {
      params: {
        id: _id
      }
    });
  }
  getItemById(_id: string){
    return this.http.get(this.link, {
      params: {
        _id
      }
    })
  }
}
