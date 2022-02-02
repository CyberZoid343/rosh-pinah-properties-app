import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  user!: User;
  userSubscription: Subscription = new Subscription;
  showError = false;
  loading = false;

  constructor(
    public router: Router,
    public userService: UserService
  ) {
    this.loading = true;
    //Check if connection to the server exists
    this.userSubscription = this.userService.getUser(this.userService.getLoggedInUserId()).subscribe(
      (respose) => {
        this.loading = false;
        this.showError = false;
      },
      (error) => {
        this.loading = false;
        this.showError = true;
      }
    )
  }

  ngOnInit(): void {
    this.router.navigateByUrl("/dashboard/account-settings/personal-details");
  }
}
