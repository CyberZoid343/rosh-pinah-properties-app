import { Component } from '@angular/core';

@Component({
  selector: 'app-reload-page-warning',
  templateUrl: './reload-page-warning.component.html',
  styleUrls: ['./reload-page-warning.component.scss']
})
export class ReloadPageWarningComponent {

  constructor() { }

  reloadPage(){
    window.location.reload();
  }

}
