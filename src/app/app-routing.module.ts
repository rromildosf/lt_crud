import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', component: UserRegisterComponent },
  { path: 'users', component: UserListComponent},
  { path: 'users/new', component: UserRegisterComponent },
  { path: 'users/:id/edit', component: UserRegisterComponent },
  { path: 'users/:id', component: UserDetailsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      onSameUrlNavigation: 'reload',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
