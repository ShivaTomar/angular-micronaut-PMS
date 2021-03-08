import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from "../_models/owner";
import { config } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: Owner;
  constructor(private http: HttpClient) { }

  updateFullName(fullName: String) {
    return this.http.patch(`${config.apiUrl}/owner`, { fullName: fullName });
  }

  updatePassword(password: String) {
    return this.http.patch(`${config.apiUrl}/owner`, { password: password });
  }

  getOwner() {
    return this.http.get(`${config.apiUrl}/owner`);
  }
}