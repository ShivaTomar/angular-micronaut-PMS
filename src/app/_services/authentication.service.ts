import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../configs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Owner } from "../_models/owner";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUserSubject: BehaviorSubject<Owner>;
  currentUser: Observable<Owner>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Owner>(JSON.parse(localStorage.getItem("currentUser")));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getCurrentUser(): Owner {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}/login`, { username: username, password: password })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn() {
    return localStorage.getItem("currentUser");
  }
}