import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/dashboard/clients/clients.component';
import { PropertiesComponent } from './pages/dashboard/properties/properties.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompaniesComponent } from './pages/dashboard/companies/companies.component';
import { HelpComponent } from './pages/dashboard/help/help.component';
import { AuditLogComponent } from './pages/dashboard/audit-log/audit-log.component';
import { TopBarComponent } from './componenets/top-bar/top-bar.component';
import { UserFormDialogComponent } from './pages/dashboard/users/user-form-dialog/user-form-dialog.component';
import { AccountSettingsComponent } from './pages/dashboard/account-settings/account-settings.component';
import { PersonalDetailsFormComponent } from './pages/dashboard/account-settings/personal-details-form/personal-details-form.component';
import { ChangePasswordFormComponent } from './pages/dashboard/account-settings/change-password-form/change-password-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeactivateUserDialogComponent } from './pages/dashboard/users/deactivate-user-dialog/deactivate-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ClientsComponent,
    PropertiesComponent,
    UsersComponent,
    CompaniesComponent,
    HelpComponent,
    AuditLogComponent,
    TopBarComponent,
    UserFormDialogComponent,
    AccountSettingsComponent,
    PersonalDetailsFormComponent,
    ChangePasswordFormComponent,
    DeactivateUserDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
