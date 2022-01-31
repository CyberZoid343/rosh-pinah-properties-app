import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.router.navigateByUrl("/dashboard/account-settings/account-overview");
  }

}
