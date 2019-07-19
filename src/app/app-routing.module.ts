import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

export const routes: Routes = [
{
  path: '',
  redirectTo: 'users',
  pathMatch: 'full'
},
{
  path: 'users',
  loadChildren: () => import('../modules/users-list/users-list.module').then(m => m.UsersListModule)
},
{
  path: 'user',
  loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
