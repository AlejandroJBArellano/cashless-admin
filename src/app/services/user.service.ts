import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Profile from '../types/Profile';
import User from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public link = `${environment.api}/user`;
  constructor(private http: HttpClient) { }

  createUser(user: User){
    return this.http.post(this.link, user);
  }
  getUsers(){
    return this.http.get(this.link);
  }
  deleteUser(id: string){
    return this.http.delete(this.link, {
      params: {id}
    });
  }
  editUser(user: User){
    return this.http.put(this.link, user, {
      params: {
        // eslint-disable-next-line no-underscore-dangle
        id: user._id
      }
    });
  }
  getUsersByParams(user: User){
    console.log(user)
    return this.http.get(this.link, {
      params: {
        ...user
      }
    })
  }
}
