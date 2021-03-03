import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models/owner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-manage-owner',
  templateUrl: './manage-owner.component.html',
  styleUrls: ['./manage-owner.component.css']
})
export class ManageOwnerComponent implements OnInit {
  owner: Owner;
  profileForm: FormGroup;

  get f() { return this.profileForm.controls };
  get fullNameFc() { return this.profileForm.get('fullName') };
  get passwordFc() { return this.profileForm.get('password') };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private AuthenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.ownerDetails()

    this.profileForm = this.formBuilder.group({
      fullName: [this.owner.fullName, [Validators.required]],
      password: [this.owner.password, [Validators.required, Validators.minLength(6)]],
    })
  }

  fullNameFCHasError() {
    return (this.fullNameFc.touched || this.fullNameFc.dirty) && !!this.fullNameErrorMessage();
  }

  passwordFCHasError() {
    return (this.passwordFc.touched || this.passwordFc.dirty) && !!this.passwordErrorMessage();
  }

  fullNameErrorMessage() {
    return this.fullNameFc.hasError('required') ? 'Full Name is required' : '';
  }

  passwordErrorMessage() {
    return this.passwordFc.hasError('required') ? 'Password is required'
    : this.passwordFc.hasError('minlength') ? 'Password must be at least 6 character long.' : '';
  }

  ownerDetails(): void {
    this.userService.getOwner().subscribe(user => { this.owner = user; });
  }

  onSubmit() {

    if (!this.profileForm.valid) {
      this.profileForm.markAsTouched();
      return;
    }

    this.userService.updateUser(this.f.fullName.value, this.f.password.value).subscribe(success => {
      this.AuthenticationService.currentUserSubject.next(success);
      this.router.navigate(["/"])
    });
  }
}