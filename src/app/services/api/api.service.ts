import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthentication } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiConnectionString = "https://roshpinahpropertieswebapi20211206152720.azurewebsites.net/api/";

  auth: any;
  authorizationData: any;
  headerOptions: any;

  constructor() { }

  getHttpHeaders() {
    this.auth = JSON.parse(localStorage.getItem('auth')!);

    this.authorizationData = 'Basic ' + btoa(this.auth.email + ':' + this.auth.password);
    this.headerOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authorizationData
      })
    };

    return this.headerOptions;
  }
}
