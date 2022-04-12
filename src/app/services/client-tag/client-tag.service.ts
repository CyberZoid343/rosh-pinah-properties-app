import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientTag } from 'src/app/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClientTagService {

  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public router: Router
  ) { }

  apiURL = this.apiService.apiConnectionString + "ClientTag";

  updateClientTags(clientTag: any, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/" + id, clientTag, this.apiService.getHttpHeaders());
  }
}