import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Property } from 'src/app/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) { }

  apiURL = this.apiService.apiConnectionString + "property";

  getFilters() {
    let url = this.router.url;
    if (url.indexOf('?') > -1) {
      return url.substring(this.router.url.indexOf('?'));
    }
    else {
      return '';
    }
  }

  getPropertySet(): Observable<any> {
    return this.http.get(this.apiURL + this.getFilters(), this.apiService.getHttpHeaders())
  }

  getProperty(id: number): Observable<any> {
    return this.http.get(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }

  addProperty(property: Property): Observable<any> {
    return this.http.post(this.apiURL, property, this.apiService.getHttpHeaders());
  }

  updateProperty(property: Property, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/" + id, property, this.apiService.getHttpHeaders());
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }
}
