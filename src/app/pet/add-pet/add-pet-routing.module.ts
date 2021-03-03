import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPetComponent } from './add-pet.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';

const routes: Routes = [{ path: '', component: AddPetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPetRoutingModule { }
