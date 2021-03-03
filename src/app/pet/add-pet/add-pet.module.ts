import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddPetRoutingModule } from './add-pet-routing.module';
import { AddPetComponent } from './add-pet.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AddPetComponent],
  imports: [
    CommonModule,
    AddPetRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AddPetModule { }
