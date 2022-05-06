import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { PropertiesComponent } from './views/properties/properties.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { ClientsComponent } from './views/clients/clients.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { DeleteMessageComponent } from './components/delete-message/delete-message.component';
import { ClientFiltersComponent } from './components/client-filters/client-filters.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UsersComponent } from './views/users/users.component';
import { ProfilePasswordFormComponent } from './components/profile-password-form/profile-password-form.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ProfileDetailsFormComponent } from './components/profile-details-form/profile-details-form.component';
import { TagSelectorComponent } from './components/tag-selector/tag-selector.component';
import { TagListComponent } from './components/tag-list/tag-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientFormComponent,
    LoadingIndicatorComponent,
    PropertiesComponent,
    SidenavComponent,
    DashboardComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
    ClientsComponent,
    ClientDetailsComponent,
    DeleteMessageComponent,
    ClientFiltersComponent,
    PropertyFormComponent,
    UserFormComponent,
    UserDetailsComponent,
    UsersComponent,
    ProfilePasswordFormComponent,
    PropertyDetailsComponent,
    ProfileComponent,
    ProfileDetailsFormComponent,
    TagSelectorComponent,
    TagListComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatMenuModule,
    CommonModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
