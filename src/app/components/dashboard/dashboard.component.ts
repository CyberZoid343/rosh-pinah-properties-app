import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isCollapsed = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
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
