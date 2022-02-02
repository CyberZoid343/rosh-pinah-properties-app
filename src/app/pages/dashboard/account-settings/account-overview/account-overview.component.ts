import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {

  users: User[] = [];
  userSubscription: Subscription = new Subscription;
  user!: User;

  gettingUser = false;
  loading = true;

  constructor(
    public userService: UserService,
    public snackBar: MatSnackBar,
    ) {
    this.getUser(this.userService.getLoggedInUserId())
  }

  ngOnInit(): void {
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
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-danger'],
        });
        this.gettingUser = false;
      }
    )
  }

}
