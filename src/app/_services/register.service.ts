import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from "../_models/owner";
import { config } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  register(user: Owner) {
    return this.http.post<Owner>(`${config.apiUrl}/register`, user);
  }

  isUniqueEmail(email: String) {
    return this.http.post<any>(`${config.apiUrl}/verify-email`, { email: email });
  }

  isUniqueUsername(username: String) {
    return this.http.post<any>(`${config.apiUrl}/verify-username`, { username: username });
  }
}