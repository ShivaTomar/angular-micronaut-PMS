import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ManageOwnerRoutingModule } from './manage-owner-routing.module';
import { ManageOwnerComponent } from './manage-owner.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ManageOwnerComponent],
  imports: [
    CommonModule,
    ManageOwnerRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ManageOwnerModule { }
