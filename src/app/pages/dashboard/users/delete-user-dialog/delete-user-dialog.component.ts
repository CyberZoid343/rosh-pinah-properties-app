import { Component, Inject, OnDestroy, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnDestroy {

  userSubscription: Subscription = new Subscription;
  deletingUser = false;

  constructor(
    public userService: UserService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
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
        this.deletingUser = false;
        this.snackBar.open("User successfully deleted.", 'Close', {
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
        this.deletingUser = false;
      }
    )
  }

}
