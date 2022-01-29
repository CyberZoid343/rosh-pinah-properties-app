import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';

const currentDate = new Date();

const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const timestamp = currentDate.getTime();

const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  expanded = true;
  userSubscription: Subscription = new Subscription;
  admin = false;

  constructor(
    public userService: UserService,
    public router: Router
  ) {
    this.admin = this.userService.checkIfUserIsAdmin();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    var user: User = JSON.parse(localStorage.getItem('user')!);

    user.isOnline = false;
    user.dateLastLogoff = new Date();

    console.log(user);

    this.userSubscription = this.userService.updateUser(user, user.id).subscribe(
      (result) => {
        console.log(result);
        localStorage.removeItem('user');
        this.router.navigate(['']);
      },
      (error) => {
        console.log(error);
        localStorage.removeItem('user');
        this.router.navigate(['']);
      }
    )
  }
}
