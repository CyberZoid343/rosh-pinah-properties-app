import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/dashboard/clients/clients.component';
import { PropertiesComponent } from './pages/dashboard/properties/properties.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './componenets/top-bar/top-bar.component';
import { CompaniesComponent } from './pages/dashboard/companies/companies.component';
import { AnalyticsComponent } from './pages/dashboard/analytics/analytics.component';
import { InboxComponent } from './pages/dashboard/inbox/inbox.component';
import { SettingsComponent } from './pages/dashboard/settings/settings.component';
import { HelpComponent } from './pages/dashboard/help/help.component';
import { AuditLogComponent } from './pages/dashboard/audit-log/audit-log.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CreateNewPasswordComponent } from './pages/create-new-password/create-new-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    ClientsComponent,
    PropertiesComponent,
    UsersComponent,
    ProfileComponent,
    TopBarComponent,
    CompaniesComponent,
    AnalyticsComponent,
    InboxComponent,
    SettingsComponent,
    HelpComponent,
    AuditLogComponent,
    ForgotPasswordComponent,
    CreateNewPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
