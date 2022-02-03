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
import { AccountSettingsComponent } from './pages/dashboard/account-settings/account-settings.component';
import { PersonalDetailsFormComponent } from './pages/dashboard/account-settings/personal-details-form/personal-details-form.component';
import { ChangePasswordFormComponent } from './pages/dashboard/account-settings/change-password-form/change-password-form.component';
import { AccountOverviewComponent } from './pages/dashboard/account-settings/account-overview/account-overview.component';

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
        path: "account-settings", component: AccountSettingsComponent, children: [
          {
            path: "account-overview", component: AccountOverviewComponent
          },
          {
            path: "personal-details", component: PersonalDetailsFormComponent
          },
          {
            path: "change-password", component: ChangePasswordFormComponent
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
