import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../_services/register.service';
import { isUniqueUsername, isUniqueEmail } from '../_custom/registerFormValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  alertMessage: String;
  registerForm: FormGroup;
  loading: boolean;

  get f() { return this.registerForm.controls; }
  get a() { return this.registerForm.controls.address['controls']; }

  getEmailFC() { return this.registerForm.get("email") }
  getFullNameFC() { return this.registerForm.get("fullName") }
  getUserNameFC() { return this.registerForm.get("username") }
  getPasswordFC() { return this.registerForm.get("password") }
  getAddressFC() { return this.registerForm.controls.address; }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['John Wick', Validators.required],
      username: ['John', [Validators.required], isUniqueUsername.bind(this), { updateOn: 'blur' }],
      email: ['JohnWick860@gmail.com', [Validators.required, Validators.email], isUniqueEmail.bind(this)],
      password: ['john_123', [Validators.required, Validators.minLength(6)]],
      address: this.formBuilder.group({
        line1: ['163, avantika, ansal', Validators.required],
        line2: ['near shastri nagar'],
        district: ['Ghaziabad', Validators.required],
        state: ['UP', Validators.required],
        pincode: ['201002', [Validators.required, Validators.maxLength(6)]],
      })
    });
  }

  isInvalidInput(fieldName): boolean {
    return this.registerForm.get(fieldName).invalid && (this.registerForm.get(fieldName).dirty || this.registerForm.touched);
  }

  isInvalidAddressInput(fieldName): boolean {
    return this.getAddressFC().get(fieldName).invalid && (this.getAddressFC().get(fieldName).dirty || this.getAddressFC().touched);
  }

  EmailHasError() {
    return !!this.EmailErrorMessage;
  }

  FullNameHasError() {
    return !!this.fullNameErrorMessage;
  }

  UserNameHasError() {
    return !!this.userNameErrorMessage;
  }

  PasswordHasError() {
    return !!this.passwordErrorMessage;
  }

  fullNameErrorMessage() {
    return this.getFullNameFC().hasError('required') ? 'Full Name  is required' : '';
  }

  passwordErrorMessage() {
    return this.getPasswordFC().hasError('required') ? 'Password is required' 
    : this.getPasswordFC().hasError('minlength') ? 'Password must be at least 6 character long.' : ''; 
  }
  
  EmailErrorMessage() {
    return this.getEmailFC().hasError('required') ? 'Email is required'
    : this.getEmailFC().hasError('email') ? 'This email is not valid'
    : this.getEmailFC().hasError('notUniqueEmail') ? 'An account with this email already exists.' : '';
  }
  
  userNameErrorMessage() {
    return this.getUserNameFC().hasError('required') ? 'User Name  is required'
    : this.getUserNameFC().hasError('notUniqueUsername') ? 'An Account with this email already exists.' : '';
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.registerService.register(this.registerForm.value).subscribe(
      success => {
        this.router.navigate(['/login']);
      },
      error => {
        this.alertMessage = error;
      }
    )
  }
}