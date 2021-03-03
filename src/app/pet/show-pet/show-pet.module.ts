import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShowPetRoutingModule } from './show-pet-routing.module';
import { ShowPetComponent } from './show-pet.component';

import { AuthGuard } from 'src/app/_guards/auth.guard';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';
import { fakeBackendProvider } from 'src/app/_helpers/fake-backend';
import { PetService } from 'src/app/_services/pet.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@NgModule({
  declarations: [ShowPetComponent],
  imports: [
    CommonModule,
    ShowPetRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, PetService, AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
})
export class ShowPetModule { }