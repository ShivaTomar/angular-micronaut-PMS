import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOwnerComponent } from './manage-owner.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';

const routes: Routes = [{ path: '', component: ManageOwnerComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageOwnerRoutingModule { }
