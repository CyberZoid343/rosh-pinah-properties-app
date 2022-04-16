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
import { ProfileComponent } from './views/profile/profile.component';
import { PasswordComponent } from './views/password/password.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { ClientFiltersComponent } from './components/client-filters/client-filters.component';
import { ClientListBadComponent } from './components/client-list-bad/client-list-bad.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { PropertiesComponent } from './views/properties/properties.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ClientNotesComponent } from './components/client-notes/client-notes.component';
import { UserProfileHandleComponent } from './components/user-profile-handle/user-profile-handle.component';
import { UsersComponent } from './views/users/users.component';
import { ClientsComponent } from './views/clients/clients.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientListBadComponent,
    ProfileComponent,
    PasswordComponent,
    UserFormComponent,
    ClientFormComponent,
    LoadingIndicatorComponent,
    ModalConfirmComponent,
    ClientDetailsComponent,
    ClientFiltersComponent,
    PropertiesComponent,
    SidenavComponent,
    DashboardComponent,
    ClientNotesComponent,
    UserProfileHandleComponent,
    UsersComponent,
    ClientsComponent
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
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
