import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reload-page-warning',
  templateUrl: './reload-page-warning.component.html',
  styleUrls: ['./reload-page-warning.component.scss']
})
export class ReloadPageWarningComponent {

  constructor(
    public router: Router
  ) { }

  reloadPage(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

}
