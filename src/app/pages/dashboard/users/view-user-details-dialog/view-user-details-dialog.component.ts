import { Component, Inject, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-user-details-dialog',
  templateUrl: './view-user-details-dialog.component.html',
  styleUrls: ['./view-user-details-dialog.component.scss']
})
export class ViewUserDetailsDialogComponent implements OnDestroy {

  userSubscription: Subscription = new Subscription;
  user!: User;

  gettingUser = false;
  loading = true;

  constructor(
    public userService: UserService,
    public snackBar: MatSnackBar,
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

  test(){
    alert("test");
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
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-danger'],
        });
        this.gettingUser = false;
      }
    )
  }
}
