import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean = false;
  authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated;
    this.authSub = this.authService.isAuthenticatedOb.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
