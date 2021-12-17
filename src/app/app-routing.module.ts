import { CreateNewPasswordComponent } from './pages/create-new-password/create-new-password.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HelpComponent } from './pages/dashboard/help/help.component';
import { SettingsComponent } from './pages/dashboard/settings/settings.component';
import { AuditLogComponent } from './pages/dashboard/audit-log/audit-log.component';
import { InboxComponent } from './pages/dashboard/inbox/inbox.component';
import { AnalyticsComponent } from './pages/dashboard/analytics/analytics.component';
import { CompaniesComponent } from './pages/dashboard/companies/companies.component';
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
    path: "forgot-password", component: ForgotPasswordComponent
  },
  {
    path: "create-new-password", component: CreateNewPasswordComponent
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
        path: "analytics", component: AnalyticsComponent
      },
      {
        path: "inbox", component: InboxComponent
      },
      {
        path: "users", component: UsersComponent
      },
      {
        path: "audit-log", component: AuditLogComponent
      },
      {
        path: "profile", component: ProfileComponent
      },
      {
        path: "settings", component: SettingsComponent
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
