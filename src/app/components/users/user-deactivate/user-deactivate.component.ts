import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-deactivate',
  templateUrl: './user-deactivate.component.html',
  styleUrls: ['./user-deactivate.component.scss']
})
export class UserDeactivateComponent implements OnDestroy {

  userSubscription: Subscription = new Subscription;
  user!: User;
  deactivatingUser = false;

  constructor(
    public userService: UserService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<UserDeactivateComponent>,
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
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  deactivateUser(){
    this.deactivatingUser = true;
    this.user.isActivated = false;
    this.userSubscription = this.userService.updateUser(this.user, this.data.id,).subscribe(
      (response) => {
        console.log(response);
        this.snackBarService.showSuccessSnackBar("User successfully deactivated.")
        this.closeDialog('success');
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.deactivatingUser = false;
      }
    )
  }
}
