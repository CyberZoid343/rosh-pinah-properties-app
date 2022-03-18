
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserNewPassword } from 'src/app/shared/interfaces';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public router: Router
  ) { }

  apiURL = this.apiService.apiConnectionString + "user";

  getUserSet(): Observable<any> {
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
    return this.http.post(this.apiURL + "/login", auth);
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

  getLoggedInUserId(){
    var user: User = JSON.parse(localStorage.getItem('user')!);
    return user.id;
  }

  getLoggedInUser(){
    var user: User = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

  checkIfUserIsAdmin(){
    var user: User = JSON.parse(localStorage.getItem('user')!);
    return user.isAdmin;
  }

  updatePassword(userNewPassword: UserNewPassword, id: number): Observable<any> {
    return this.http.put<any>(this.apiURL + "/changePassword/" + id, userNewPassword, this.apiService.getHttpHeaders());
  }
}
