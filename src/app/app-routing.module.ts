import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PropertyListComponent } from './components/properties/property-list/property-list.component';
import { PasswordComponent } from './components/password/password.component';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: "clients", component: ClientListComponent
      },
      {
        path: "properties", component: PropertyListComponent, children: [
      
        ]
      },
      {
        path: "users", component: UserListComponent, children: [
      
        ]
      },
      {
        path: "profile", component: ProfileComponent
      },
      {
        path: "password", component: PasswordComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
