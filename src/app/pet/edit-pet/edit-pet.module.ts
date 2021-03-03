import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditPetRoutingModule } from './edit-pet-routing.module';
import { EditPetComponent } from './edit-pet.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { PetService } from 'src/app/_services/pet.service';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';
import { fakeBackendProvider } from 'src/app/_helpers/fake-backend';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@NgModule({
  declarations: [EditPetComponent],
  imports: [
    CommonModule,
    EditPetRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, PetService, AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider,
  ],
})
export class EditPetModule { }
