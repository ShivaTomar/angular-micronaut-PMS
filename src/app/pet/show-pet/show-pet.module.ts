import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShowPetRoutingModule } from './show-pet-routing.module';
import { ShowPetComponent } from './show-pet.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ShowPetComponent],
  imports: [
    CommonModule,
    ShowPetRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class ShowPetModule { }