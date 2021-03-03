import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerProfileComponent } from './owner-profile.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';

const routes: Routes = [{ path: '', component: OwnerProfileComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerProfileRoutingModule { }
