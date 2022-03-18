import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';
import { UserActivateComponent } from '../user-activate/user-activate.component';
import { UserDeactivateComponent } from '../user-deactivate/user-deactivate.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnDestroy {

  users: User[] = [];
  userSubscription: Subscription = new Subscription;
  gettingUserSet = true;

  constructor(
    public userService: UserService,
    public dialog: MatDialog,
    public snackBarService: SnackBarService
  ) {
    this.getUserSet();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  getUserSet() {
    this.gettingUserSet = true;
    this.userSubscription = this.userService.getUserSet().subscribe(
      (response) => {
        console.log(response)
        this.users = response;
        this.gettingUserSet = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  openUserFormDialog(id: number) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '700px',
      height: '100%',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getUserSet();
      }
    });
  }

  openDeactivateUserDialog(id: number) {
    const dialogRef = this.dialog.open(UserDeactivateComponent, {
      width: '500px',
      data: { id: id },
      panelClass: 'dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getUserSet();
      }
    });
  }

  openActivateUserDialog(id: number) {
    const dialogRef = this.dialog.open(UserActivateComponent, {
      width: '500px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getUserSet();
      }
    });
  }

  openDeleteUserDialog(id: number) {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: '500px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getUserSet();
      }
    });
  }

}
