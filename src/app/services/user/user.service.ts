
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthentication } from 'src/app/shared/interfaces';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  apiURL = this.apiService.apiConnectionString + "user";

  getUsers(): Observable<any> {
    return this.http.get(this.apiURL, this.apiService.getHttpHeaders())
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.apiURL + "/" + id)
  }

  addUser(client: Object): Observable<any> {
    return this.http.post(this.apiURL, client);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "/" + id)
  }

  updateUser(object: object, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/" + id, object);
  }

  login(auth: Object): Observable<any>{
    return this.http.post(this.apiURL + "/login", auth, this.apiService.getHttpHeaders());
  }

  isLoggedIn(){
    var user = localStorage.getItem('user')
    if (user == null){
      return false
    }
    else{
      return true
    }
  }
}
