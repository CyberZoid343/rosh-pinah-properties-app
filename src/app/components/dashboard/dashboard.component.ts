import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isCollapsed = false;
  loggedInUser!: User;

  constructor(public router: Router) {
    this.loggedInUser = JSON.parse(localStorage.getItem('user')!);
    console.log(this.loggedInUser)
  }

  handleSideBarCollapse(){
    if(this.isCollapsed){
      this.isCollapsed = false;
    }
    else{
      this.isCollapsed = true;
    }
  }

  logoff(){
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
