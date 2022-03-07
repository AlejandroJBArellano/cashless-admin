import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Profile from '../types/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public link = 'http://localhost:3000/profile';
  constructor(private http: HttpClient) { }

  getProfiles(){
    return this.http.get(this.link);
  }
  createProfile(profile: Profile){
    return this.http.post(this.link, profile);
  }
  deleteProfile(_id: string){
    return this.http.delete(this.link, {
      params: {
        _id
      }
    });
  }
  editProfile(profile: Profile){
    return this.http.put(this.link, profile, {
      // eslint-disable-next-line no-underscore-dangle
      params: {_id: profile._id}
    });
  }
  getProfileById(profile: Profile){
    return this.http.get(this.link, {
      params: {
        _id: profile._id
      }
    }).toPromise();
  }
}
