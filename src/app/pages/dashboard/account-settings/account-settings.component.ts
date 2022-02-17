import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    public router: Router,
  ) {}

  ngOnInit() {
    this.router.navigateByUrl("/dashboard/account-settings/account-overview")
  }
}
