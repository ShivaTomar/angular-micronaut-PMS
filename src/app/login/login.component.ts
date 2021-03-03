import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  usernameFormControl() { return this.loginForm.get("username"); }
  passwordFormControl() { return this.loginForm.get("password"); }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  isInvalidInput(fieldName) {
    return this.loginForm.get(fieldName).invalid && (this.loginForm.get(fieldName).dirty || this.loginForm.touched);
  }

  usernameFCHasError() {
    return !!this.usernameErrorMessage;
  }

  passwordFCHasError() {
    return !!this.passwordErrorMessage;
  }

  usernameErrorMessage() {
    return this.usernameFormControl().hasError('required') ? 'Username is required' : '';
  }

  passwordErrorMessage() {
    return this.passwordFormControl().hasError('required') ? 'Password is required' : '';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
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