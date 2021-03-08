import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models/owner';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { computeMsgId } from '@angular/compiler';

@Component({
  selector: 'app-manage-owner',
  templateUrl: './manage-owner.component.html',
  styleUrls: ['./manage-owner.component.css']
})
export class ManageOwnerComponent implements OnInit {
  owner: Owner;
  profilePasswordForm: FormGroup;
  profileFullNameForm: FormGroup;

  get fullNameFc() { return this.profileFullNameForm.get('fullName') };
  get passwordFc() { return this.profilePasswordForm.get('password') };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.profileFullNameForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
    })

    this.profilePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
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

  changeFullName() {
    if (!this.fullNameFc.valid) {
      this.fullNameFc.markAllAsTouched();
      return;
    }

    this.userService.updateFullName(this.fullNameFc.value).subscribe(() => {
      this.router.navigate(["/"]);
    })
  }

  changePassword() {
    if (!this.passwordFc.valid) {
      this.passwordFc.markAllAsTouched();
      return;
    }

    this.userService.updatePassword(this.passwordFc.value).subscribe(() => {
      this.router.navigate(["/"]);
    })
  }
}