import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Item from '../types/Item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public link = `${environment.api}/menu`;
  public menus: {_id: string; items: Item[]};
  constructor(private http: HttpClient) { }

  getMenus(){
    return this.http.get(this.link);
  }
  createMenu(items: Item[]){
    return this.http.post(this.link, items);
  }
  editMenu(menu: {_id?: string; items: Item[]}){
    return this.http.put(this.link, menu, {
      params: {
        id: menu._id
      }
    })
  }
  getMenusByItem(item: Item){
    return this.http.get(this.link, {
      params: {
        ...item
      }
    })
  }
  getMenuById(_id: string){
    return this.http.get(this.link, {
      params: {
        _id
      }
    })
  }
}
