import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) { }

  apiURL = this.apiService.apiConnectionString + "client";

  getFilters() {
    let url = this.router.url;
    if (url.indexOf('?') > -1) {
      return url.substring(this.router.url.indexOf('?'));
    }
    else {
      return '?';
    }
  }

  getClientSet(): Observable<any> {
    return this.http.get(this.apiURL + this.getFilters(), this.apiService.getHttpHeaders())
  }

  getClient(id: number): Observable<any> {
    return this.http.get(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }

  addClient(client: Client): Observable<any> {
    return this.http.post(this.apiURL, client, this.apiService.getHttpHeaders());
  }

  updateClient(client: Client, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/" + id, client, this.apiService.getHttpHeaders());
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }

  getClientSetForExcel(): Observable<any> {

    let filters = this.getFilters();

    filters += '&rows=10000'

    return this.http.get(this.apiURL + filters, this.apiService.getHttpHeaders())
  }
  
}
