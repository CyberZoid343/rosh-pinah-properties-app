import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-activate-user-dialog',
  templateUrl: './activate-user-dialog.component.html',
  styleUrls: ['./activate-user-dialog.component.scss']
})
export class ActivateUserDialogComponent implements OnDestroy {

  userSubscription: Subscription = new Subscription;
  user!: User;
  activatingUser = false;

  constructor(
    public userService: UserService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ActivateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) {
    this.getUser(data.id);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  getUser(id: number){
    this.userSubscription = this.userService.getUser(id).subscribe(
      (response) => {
        this.user = response;
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-danger'],
        });
      }
    )
  }

  activateUser(){
    this.activatingUser = true;
    this.user.isActivated = true;
    this.userSubscription = this.userService.updateUser(this.user, this.data.id,).subscribe(
      (response) => {
        console.log(response);
        this.activatingUser = false;
        this.snackBar.open("User successfully activated.", 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-success'],
        });
        this.closeDialog('success');
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-danger'],
        });
        this.activatingUser = false;
      }
    )
  }
}
