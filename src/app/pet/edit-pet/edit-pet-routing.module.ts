import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPetComponent } from './edit-pet.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';

const routes: Routes = [{ path: '', component: EditPetComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPetRoutingModule { }
