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

  get EmailFC() { return this.registerForm.get("email") }
  get FullNameFC() { return this.registerForm.get("fullName") }
  get UserNameFC() { return this.registerForm.get("username") }
  get PasswordFC() { return this.registerForm.get("password") }

  get AddressControls() { return this.registerForm.controls.address; }
  get addressFc() { return this.AddressControls.get('line1') }
  get districtFc() { return this.AddressControls.get('district') }
  get stateFc() { return this.AddressControls.get('state') }
  get pincodeFc() { return this.AddressControls.get('pincode') }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      fullName: ['John Wick', Validators.required],
      username: ['John', [Validators.required], isUniqueUsername.bind(this)],
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

  EmailHasError() {
    return (this.EmailFC.touched || this.EmailFC.dirty) && !!this.EmailErrorMessage();
  }

  FullNameHasError() {
    return (this.FullNameFC.touched || this.FullNameFC.dirty) && !!this.fullNameErrorMessage();
  }

  UserNameHasError() {
    return (this.UserNameFC.touched || this.UserNameFC.dirty) && !!this.userNameErrorMessage();
  }

  PasswordHasError() {
    return (this.PasswordFC.touched || this.PasswordFC.dirty) && !!this.passwordErrorMessage();
  }

  fullNameErrorMessage() {
    return this.FullNameFC.hasError('required') ? 'Full Name  is required' : '';
  }

  passwordErrorMessage() {
    return this.PasswordFC.hasError('required') ? 'Password is required'
    : this.PasswordFC.hasError('minlength') ? 'Password must be at least 6 character long.' : '';
  }

  EmailErrorMessage() {
    return this.EmailFC.hasError('required') ? 'Email is required'
    : this.EmailFC.hasError('email') ? 'This email is not valid'
    : this.EmailFC.hasError('notUniqueEmail') ? 'An account with this email already exists.' : '';
  }

  userNameErrorMessage() {
    return this.UserNameFC.hasError('required') ? 'User Name  is required'
    : this.UserNameFC.hasError('notUniqueUsername') ? 'An Account with this email already exists.' : '';
  }

  stateHasError() {
    return (this.stateFc.touched || this.stateFc.dirty) && !!this.stateErrorMessage();
  };

  addressHasError() {
    return (this.addressFc.touched || this.stateFc.dirty) && !!this.addressErrorMessage();
  };

  pincodeHasError() {
    return (this.pincodeFc.touched || this.pincodeFc.dirty) && !!this.pincodeErrorMessage();
  };

  districtHasError() {
    return (this.districtFc.touched || this.districtFc.dirty) && !!this.districtErrorMessage();
  };

  stateErrorMessage() {
    return this.stateFc.hasError('required') ? 'State is required' : '';
  };

  addressErrorMessage() {
    return this.addressFc.hasError('required') ? 'Address is required' : '';
  };

  districtErrorMessage() {
    return this.districtFc.hasError('required') ? 'District is required' : '';
  };

  pincodeErrorMessage() {
    return this.pincodeFc.hasError('required') ? 'Pincode is required'
    : this.pincodeFc.hasError('maxlength') ? 'Pincode cannot be of more than 6 digits' : '';
  };

  onSubmit() {

    if (!this.registerForm.valid) {
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