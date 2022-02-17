import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
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
    public snackBarService: SnackBarService,
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
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  activateUser(){
    this.activatingUser = true;
    this.user.isActivated = true;
    this.userSubscription = this.userService.updateUser(this.user, this.data.id,).subscribe(
      (response) => {
        console.log(response);
        this.snackBarService.showSuccessSnackBar("User successfully activated.")
        this.closeDialog('success');
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.activatingUser = false;
      }
    )
  }
}
