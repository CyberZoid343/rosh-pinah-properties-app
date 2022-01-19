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
import { SettingsComponent } from './pages/dashboard/settings/settings.component';
import { ManageAccountComponent } from './pages/dashboard/settings/manage-account/manage-account.component';
import { ChangePasswordComponent } from './pages/dashboard/settings/change-password/change-password.component';
import { TopBarComponent } from './componenets/top-bar/top-bar.component';
import { MakeAdminDialogComponent } from './pages/dashboard/users/make-admin-dialog/make-admin-dialog.component';
import { UserFormDialogComponent } from './pages/dashboard/users/user-form-dialog/user-form-dialog.component';

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
    SettingsComponent,
    ManageAccountComponent,
    ChangePasswordComponent,
    TopBarComponent,
    MakeAdminDialogComponent,
    UserFormDialogComponent
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
