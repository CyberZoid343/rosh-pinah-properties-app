import { UserService } from './../../../services/user/user.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DeactivateUserDialogComponent } from './deactivate-user-dialog/deactivate-user-dialog.component';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';

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
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.getUsers();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
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

  openUserFormDialog(id: number) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added' || result == 'updated'){
        this.loadingUsers = true;
        this.getUsers();
      }
    });
  }

  openDeactivateUserDialog() {
    const dialogRef = this.dialog.open(DeactivateUserDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


