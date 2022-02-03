import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-deactivate-user-dialog',
  templateUrl: './deactivate-user-dialog.component.html',
  styleUrls: ['./deactivate-user-dialog.component.scss']
})
export class DeactivateUserDialogComponent implements OnDestroy {

  userSubscription: Subscription = new Subscription;
  user!: User;
  deactivatingUser = false;

  constructor(
    public userService: UserService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeactivateUserDialogComponent>,
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
        console.log(response);
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

  deactivateUser(){
    this.deactivatingUser = true;
    this.user.isActivated = false;
    this.userSubscription = this.userService.updateUser(this.user, this.data.id,).subscribe(
      (response) => {
        console.log(response);
        this.deactivatingUser = false;
        this.snackBar.open("User successfully deactivated.", 'Close', {
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
        this.deactivatingUser = false;
      }
    )
  }
}
