import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'owner', loadChildren: () => import('./owner/owner-profile/owner-profile.module').then(m => m.OwnerProfileModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'pets', loadChildren: () => import('./pet/show-pet/show-pet.module').then(m => m.ShowPetModule) },
  { path: 'add-pet', loadChildren: () => import('./pet/add-pet/add-pet.module').then(m => m.AddPetModule) },
  { path: 'manage-owner', loadChildren: () => import('./owner/manage-owner/manage-owner.module').then(m => m.ManageOwnerModule) },
  { path: 'manage-pet/:id', loadChildren: () => import('./pet/edit-pet/edit-pet.module').then(m => m.EditPetModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }