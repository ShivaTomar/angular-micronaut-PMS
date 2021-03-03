import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { fakeBackendProvider } from '../_helpers/fake-backend';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { RegisterService } from '../_services/register.service';
import { AuthenticationService } from '../_services/authentication.service';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [RegisterService, AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
})
export class RegisterModule { }