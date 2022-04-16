import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientNote } from 'src/app/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public router: Router
  ) { }

  apiURL = this.apiService.apiConnectionString + "clientNote";

  getClientNoteSet(): Observable<any> {
    var filters = this.router.url.split('?')[1]
    return this.http.get(this.apiURL + "/client?" + filters, this.apiService.getHttpHeaders())
  }

  getClientNote(id: number): Observable<any> {
    return this.http.get(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }

  addClientNote(clientNote: ClientNote): Observable<any> {
    return this.http.post(this.apiURL, clientNote, this.apiService.getHttpHeaders());
  }

  updateClientNote(clientNote: ClientNote, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/" + id, clientNote, this.apiService.getHttpHeaders());
  }

  deleteClientNote(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }
}
