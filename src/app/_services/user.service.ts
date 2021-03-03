import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from "../_models/owner";
import { config } from '../configs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser : Owner;
  constructor(private http: HttpClient) { }

  getOwner() {
    return this.http.get<Owner>(`${config.apiUrl}/owner`);
  }

  updateUser(fullName: String, password: String) {
    return this.http.patch<Owner>(`${config.apiUrl}/owner`, { fullName: fullName, password: password })
      .pipe(map(owner => {
        if (owner) {
          this.currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
          this.currentUser.fullName = owner.fullName;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        }
        return this.currentUser;
    }));
  }
}