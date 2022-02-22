import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Company } from 'src/app/shared/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public router: Router
  ) { }

  apiURL = this.apiService.apiConnectionString + "client";

  getClientSet(): Observable<any> {
    var filters = this.router.url.split('?')[1]
    return this.http.get(this.apiURL + "?" + filters, this.apiService.getHttpHeaders())
  }

  getClient(id: number): Observable<any> {
    return this.http.get(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }

  addClient(company: Company): Observable<any> {
    return this.http.post(this.apiURL, company, this.apiService.getHttpHeaders());
  }

  updateClient(company: Company, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/" + id, company, this.apiService.getHttpHeaders());
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }
}
