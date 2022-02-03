import { UserService } from './../../../services/user/user.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { DeactivateUserDialogComponent } from './deactivate-user-dialog/deactivate-user-dialog.component';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { ActivateUserDialogComponent } from './activate-user-dialog/activate-user-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { ViewUserDetailsDialogComponent } from './view-user-details-dialog/view-user-details-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {

  users: User[] = [];
  userSubscription: Subscription = new Subscription;
  gettingUsers = true;
  gettingUsersError = false;

  constructor(
    public userService: UserService,
    public dialog: MatDialog
  ) {
    this.getUsers();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  getUsers() {
    this.gettingUsersError = false;
    this.gettingUsers = true;
    this.userSubscription = this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.gettingUsers = false;
      },
      (error) => {
        console.log(error);
        this.gettingUsers = false;
        this.gettingUsersError = true;
      }
    )
  }

  openUserFormDialog(id: number) {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getUsers();
      }
    });
  }

  openDeactivateUserDialog(id: number) {
    const dialogRef = this.dialog.open(DeactivateUserDialogComponent, {
      width: '400px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getUsers();
      }
    });
  }

  openActivateUserDialog(id: number) {
    const dialogRef = this.dialog.open(ActivateUserDialogComponent, {
      width: '400px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getUsers();
      }
    });
  }

  openDeleteUserDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '400px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getUsers();
      }
    });
  }

  openViewUserDetailsDialog(id: number) {
    const dialogRef = this.dialog.open(ViewUserDetailsDialogComponent, {
      width: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getUsers();
      }
    });
  }
}


