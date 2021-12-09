import { ApiConnectionStringService } from './../api-connection-string/api-connection-string.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private ApiConnectionStringService: ApiConnectionStringService
  ) { }

  apiURL = this.ApiConnectionStringService.apiConnectionString + "user";

  getUsers(): Observable<any> {
    return this.http.get(this.apiURL)
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

  login(object: Object): Observable<any>{
    return this.http.post(this.apiURL + "/login", object);
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
