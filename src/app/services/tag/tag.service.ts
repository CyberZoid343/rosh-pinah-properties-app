import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public router: Router
  ) { }

  apiURL = this.apiService.apiConnectionString + "tag";

  getTagSet(): Observable<any> {
    var filters = this.router.url.split('?')[1]
    return this.http.get(this.apiURL + "?" + filters, this.apiService.getHttpHeaders())
  }
}

