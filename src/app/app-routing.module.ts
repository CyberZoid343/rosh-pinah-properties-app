import { ChangePasswordComponent } from './pages/dashboard/settings/change-password/change-password.component';
import { ManageAccountComponent } from './pages/dashboard/settings/manage-account/manage-account.component';
import { SettingsComponent } from './pages/dashboard/settings/settings.component';
import { HelpComponent } from './pages/dashboard/help/help.component';
import { AuditLogComponent } from './pages/dashboard/audit-log/audit-log.component';
import { CompaniesComponent } from './pages/dashboard/companies/companies.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { PropertiesComponent } from './pages/dashboard/properties/properties.component';
import { ClientsComponent } from './pages/dashboard/clients/clients.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: "", component: LoginComponent
  },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: "companies", component: CompaniesComponent
      },
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
        path: "audit-log", component: AuditLogComponent
      },
      {
        path: "settings", component: SettingsComponent, children: [
          {
            path: "manage-account", component: ManageAccountComponent
          },
          {
            path: "change-password", component: ChangePasswordComponent
          }
        ]
      },
      {
        path: "help", component: HelpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
