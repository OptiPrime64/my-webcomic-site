import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.isLoginMode === true){
      console.log("Login mode");
      const authData: AuthData = {email: form.value.email, password: form.value.password};
      this.authService.loginUser(authData);
    }else{
      console.log('Signin mode');
      const authData: AuthData = {email: form.value.email, password: form.value.password};
      this.authService.createUser(authData);
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {
  }

}
