import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

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
