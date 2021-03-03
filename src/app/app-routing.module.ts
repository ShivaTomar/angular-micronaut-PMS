import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInAuthGuard } from './_guards/LoggedInAuthGuard.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [LoggedInAuthGuard] },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'owner', loadChildren: () => import('./owner/owner-profile/owner-profile.module').then(m => m.OwnerProfileModule), canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'pets', loadChildren: () => import('./pet/show-pet/show-pet.module').then(m => m.ShowPetModule), canActivate: [AuthGuard] },
  { path: 'add-pet', loadChildren: () => import('./pet/add-pet/add-pet.module').then(m => m.AddPetModule), canActivate: [AuthGuard] },
  { path: 'manage-owner', loadChildren: () => import('./owner/manage-owner/manage-owner.module').then(m => m.ManageOwnerModule), canActivate: [AuthGuard] },
  { path: 'manage-pet/:id', loadChildren: () => import('./pet/edit-pet/edit-pet.module').then(m => m.EditPetModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }