import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageOwnerRoutingModule } from './manage-owner-routing.module';
import { ManageOwnerComponent } from './manage-owner.component';

import { AuthGuard } from 'src/app/_guards/auth.guard';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';
import { fakeBackendProvider } from 'src/app/_helpers/fake-backend';

@NgModule({
  declarations: [ManageOwnerComponent],
  imports: [
    CommonModule,
    ManageOwnerRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
})
export class ManageOwnerModule { }
