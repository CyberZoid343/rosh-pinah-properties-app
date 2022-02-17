import { Component, Inject, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';


@Component({
  selector: 'app-view-user-details-dialog',
  templateUrl: './view-user-details-dialog.component.html',
  styleUrls: ['./view-user-details-dialog.component.scss']
})
export class ViewUserDetailsDialogComponent implements OnDestroy {

  userSubscription: Subscription = new Subscription;
  user!: User;
  gettingUser = false;

  constructor(
    public userService: UserService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ViewUserDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
  ) { 
    this.getUser(data.id)
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  getUser(id: number) {
    this.gettingUser = true;
    this.userSubscription = this.userService.getUser(id).subscribe(
      (response) => {
        this.user = response;
        console.log(response);
        this.gettingUser = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }
}
