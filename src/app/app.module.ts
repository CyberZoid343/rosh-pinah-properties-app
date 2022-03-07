import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordComponent } from './components/password/password.component';
import { PropertyListComponent } from './components/properties/property-list/property-list.component';
import { UserDeleteComponent } from './components/users/user-delete/user-delete.component';
import { UserDeactivateComponent } from './components/users/user-deactivate/user-deactivate.component';
import { UserActivateComponent } from './components/users/user-activate/user-activate.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { ClientListFiltersComponent } from './components/clients/client-list-filters/client-list-filters.component';
import { ClientDeleteComponent } from './components/clients/client-delete/client-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserListComponent,
    ClientListComponent,
    DashboardComponent,
    ProfileComponent,
    PasswordComponent,
    PropertyListComponent,
    UserDeleteComponent,
    UserDeactivateComponent,
    UserActivateComponent,
    UserFormComponent,
    ClientFormComponent,
    ClientListFiltersComponent,
    ClientDeleteComponent
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
