import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthData } from "./auth-data.model";

const BACKEND_URL = environment.apiUrl + "/user"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  isAuthenticatedOb = new Subject<boolean>();
  tokenTimer: any;
  private token: string;

  constructor(private http: HttpClient,
    private router: Router) { }

  createUser(authData: AuthData) {
    this.http.post(BACKEND_URL + '/signup', authData)
      .subscribe(response => {
        console.log(response);
        this.loginUser(authData);
      })
  }

  loginUser(authData: AuthData) {
    this.http.post<{ token: string, expiresIn: number }>(BACKEND_URL + '/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          console.log(response.expiresIn);
          const expiresInDuration = response.expiresIn;
          this.setTokenTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.isAuthenticatedOb.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(["/"]);

        }
      })
  }

  getToken() {
    return this.token;
  }

  setTokenTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setTokenTimer(expiresIn / 1000);
      this.isAuthenticatedOb.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isAuthenticatedOb.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }



}
