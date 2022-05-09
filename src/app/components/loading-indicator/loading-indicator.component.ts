import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  @Input() loading!: boolean;

  constructor() { }

  ngOnInit(): void {

  }

  getLoadingStatus() {
    setTimeout(() => {
      return this.loading;
    },
      1000);
  }

}
