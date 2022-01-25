import { UserService } from './../../../services/user/user.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {

  users: User[] = [];
  userSubscription: Subscription = new Subscription;
  loadingUsers = true;

  constructor(
    public userService: UserService
  ) {
    this.getUsers();
  }

  getUsers(){
    this.userSubscription = this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.loadingUsers = false;
      },
      (error) => {
        console.log(error);
        this.loadingUsers = false;
      }
    )
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}


