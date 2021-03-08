import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from "../_models/owner";
import { config } from '../configs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private http: HttpClient) { }

  register(user: Owner) {
    return this.http.post<Owner>(`${config.apiUrl}/register`, user);
  }

  isUniqueUsername(username: String) {
    return this.http.post(`${config.apiUrl}/register/verify-username`, { username: username });
  }
}