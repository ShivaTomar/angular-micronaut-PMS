import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import { config } from '../configs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: String;

  get f() { return this.loginForm.controls };
  get usernameFC() { return this.loginForm.get("username"); }
  get passwordFC() { return this.loginForm.get("password"); }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  usernameFCHasError() {
    return (this.usernameFC.dirty || this.usernameFC.touched) && !!this.usernameErrorMessage();
  }

  passwordFCHasError() {
    return (this.passwordFC.dirty || this.passwordFC.touched) && !!this.passwordErrorMessage();
  }

  usernameErrorMessage() {
    return this.usernameFC.hasError('required') ? 'Username is required' : '';
  }

  passwordErrorMessage() {
    return this.passwordFC.hasError('required') ? 'Password is required' : '';
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(
      success => {
        this.router.navigate(["/"]);
      },
      error => {
        this.error = error;
      }
    )
  }

  demoLogin() {
    this.authenticationService.login(config.demoOwner, config.demoPassword).subscribe(
      success => {
        this.router.navigate(["/"]);
      },
      error => {
        this.error = error;
      }
    )
  }
}