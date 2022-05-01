import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router
  ) { }

  apiURL = this.apiService.apiConnectionString + "tag";

  getFilters() {
    let url = this.router.url;
    if (url.indexOf('?') > -1) {
      return url.substring(this.router.url.indexOf('?'));
    }
    else {
      return '';
    }
  }

  getTagSet(): Observable<any> {
    return this.http.get(this.apiURL, this.apiService.getHttpHeaders())
  }

  getTag(id: number): Observable<any> {
    return this.http.get(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }

  addTag(tag: Tag): Observable<any> {
    return this.http.post(this.apiURL, tag, this.apiService.getHttpHeaders());
  }

  updateTag(tag: Tag, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/" + id, tag, this.apiService.getHttpHeaders());
  }

  deleteTag(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }
}

