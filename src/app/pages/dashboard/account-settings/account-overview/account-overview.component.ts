import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent {

  users: User[] = [];
  userSubscription: Subscription = new Subscription;
  user!: User;

  gettingUser = false;
  loading = true;

  constructor(
    public userService: UserService,
    public snackBarService: SnackBarService,
    ) {
    this.getUser(this.userService.getLoggedInUserId())
  }

  getUser(id: number) {
    this.gettingUser = true;
    this.userSubscription = this.userService.getUser(id).subscribe(
      (response) => {
        this.user = response;
        console.log(response);
        this.gettingUser = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.gettingUser = false;
      }
    )
  }
}
