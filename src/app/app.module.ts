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
import { AccountOverviewComponent } from './pages/dashboard/account-settings/account-overview/account-overview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeactivateUserDialogComponent } from './pages/dashboard/users/deactivate-user-dialog/deactivate-user-dialog.component';
import { ActivateUserDialogComponent } from './pages/dashboard/users/activate-user-dialog/activate-user-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteUserDialogComponent } from './pages/dashboard/users/delete-user-dialog/delete-user-dialog.component';
import { ReloadPageWarningComponent } from './componenets/reload-page-warning/reload-page-warning.component';
import { ViewUserDetailsDialogComponent } from './pages/dashboard/users/view-user-details-dialog/view-user-details-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { CompanyFormDialogComponent } from './pages/dashboard/companies/company-form-dialog/company-form-dialog.component';
import { DeleteCompanyDialogComponent } from './pages/dashboard/companies/delete-company-dialog/delete-company-dialog.component';
import { ClientFormDialogComponent } from './pages/dashboard/clients/client-form-dialog/client-form-dialog.component';
import { FilterClientsFormComponent } from './pages/dashboard/clients/filter-clients-form/filter-clients-form.component';
import { FilterCompaniesFormComponent } from './pages/dashboard/companies/filter-companies-form/filter-companies-form.component';
import { ClientsTagsDialogComponent } from './pages/dashboard/clients/clients-tags-dialog/clients-tags-dialog.component';
import { DeleteClientDialogComponent } from './pages/dashboard/clients/delete-client-dialog/delete-client-dialog.component';
import { ClientFollowUpDialogComponent } from './pages/dashboard/clients/client-follow-up-dialog/client-follow-up-dialog.component';
import { ClientNotesDialogComponent } from './pages/dashboard/clients/client-notes-dialog/client-notes-dialog.component';
import { ClientDetailsDialogComponent } from './pages/dashboard/clients/client-details-dialog/client-details-dialog.component';

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
    AccountOverviewComponent,
    DeactivateUserDialogComponent,
    ActivateUserDialogComponent,
    DeleteUserDialogComponent,
    ReloadPageWarningComponent,
    ViewUserDetailsDialogComponent,
    CompanyFormDialogComponent,
    DeleteCompanyDialogComponent,
    ClientFormDialogComponent,
    FilterClientsFormComponent,
    FilterCompaniesFormComponent,
    ClientsTagsDialogComponent,
    DeleteClientDialogComponent,
    ClientFollowUpDialogComponent,
    ClientNotesDialogComponent,
    ClientDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
