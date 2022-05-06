import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { PropertiesComponent } from './views/properties/properties.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ClientsComponent } from './views/clients/clients.component';
import { UsersComponent } from './views/users/users.component';
import { ProfileComponent } from './views/profile/profile.component';

const routes: Routes = [
  {
    path: "", component: LoginComponent
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
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
