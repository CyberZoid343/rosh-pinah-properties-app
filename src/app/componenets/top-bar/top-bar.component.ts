import { DashboardComponent } from './../../pages/dashboard/dashboard.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  expanded = true;

  constructor(
    private dashBoard: DashboardComponent
  ) { }

  ngOnInit(): void {
  }

  expandMenu(){
    if (this.dashBoard.expanded){
      this.dashBoard.expanded = false;
      this.expanded = false;
    }
    else{
      this.dashBoard.expanded = true;
      this.expanded = true;
    }
  }

}
