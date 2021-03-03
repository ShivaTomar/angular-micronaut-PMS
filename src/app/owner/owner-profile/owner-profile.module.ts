import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OwnerProfileRoutingModule } from './owner-profile-routing.module';
import { OwnerProfileComponent } from './owner-profile.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [OwnerProfileComponent],
  imports: [
    CommonModule,
    OwnerProfileRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class OwnerProfileModule { }