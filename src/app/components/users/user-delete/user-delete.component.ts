import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.scss']
})
export class UserDeleteComponent implements OnDestroy {

  userSubscription: Subscription = new Subscription;
  deletingUser = false;

  constructor(
    public userService: UserService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) { }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  deleteUser(){
    this.deletingUser = true;
    this.userSubscription = this.userService.deleteUser(this.data.id).subscribe(
      (response) => {
        console.log(response);
        this.snackBarService.showSuccessSnackBar("User successfully deleted.")
        this.closeDialog('success');
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.deletingUser = false;
      }
    )
  }
}
