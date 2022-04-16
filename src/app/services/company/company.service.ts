import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Company } from 'src/app/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public router: Router
  ) { }

  apiURL = this.apiService.apiConnectionString + "company";

  getCompanySet(): Observable<any> {
    var filters = this.router.url.split('?')[1]
    return this.http.get(this.apiURL + "?" + filters, this.apiService.getHttpHeaders())
  }

  getCompany(id: number): Observable<any> {
    return this.http.get(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }

  addCompany(company: Company): Observable<any> {
    return this.http.post(this.apiURL, company, this.apiService.getHttpHeaders());
  }

  updateCompany(company: Company, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/" + id, company, this.apiService.getHttpHeaders());
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }
}
