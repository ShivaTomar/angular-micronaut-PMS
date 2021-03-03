import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';


import { AuthenticationService } from '../_services/authentication.service';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { fakeBackendProvider } from '../_helpers/fake-backend';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoggedInAuthGuard } from '../_guards/LoggedInAuthGuard.guard';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule
  ],
  providers: [AuthenticationService, LoggedInAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
})
export class LoginModule { }
