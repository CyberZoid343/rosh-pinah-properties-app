
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
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
    return this.http.get(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.apiURL, user, this.apiService.getHttpHeaders());
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiURL + "/" + id, this.apiService.getHttpHeaders())
  }

  updateUser(user: User, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/" + id, user, this.apiService.getHttpHeaders());
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
