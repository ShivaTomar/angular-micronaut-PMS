import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditPetRoutingModule } from './edit-pet-routing.module';
import { EditPetComponent } from './edit-pet.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [EditPetComponent],
  imports: [
    CommonModule,
    EditPetRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class EditPetModule { }
