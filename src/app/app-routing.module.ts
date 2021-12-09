import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { PropertiesComponent } from './pages/dashboard/properties/properties.component';
import { ClientsComponent } from './pages/dashboard/clients/clients.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "sign-up", component: SignUpComponent
  },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: "clients", component: ClientsComponent
      },
      {
        path: "properties", component: PropertiesComponent
      },
      {
        path: "users", component: UsersComponent
      },
      {
        path: "profile", component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
