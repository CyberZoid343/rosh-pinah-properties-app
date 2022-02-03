import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnDestroy {

  form: FormGroup;
  submitted = false;
  userId = 1;
  userSubscription: Subscription = new Subscription;
  user!: User;
  gettingUser = false;
  addingUser = false;
  updatingUser = false;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      surname: ['', [Validators.required, Validators.maxLength(500)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(500)]]
    });

    if (data.id > 0) {
      this.getUser(data.id);
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      if (this.data.id == 0) {
        this.addUser();
      }
      else {
        this.updateUser();
      }
    }
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  getUser(id: number) {
    this.gettingUser = true;
    this.userSubscription = this.userService.getUser(id).subscribe(
      (response) => {
        this.user = response;
        this.form.controls['name'].setValue(this.user?.name);
        this.form.controls['surname'].setValue(this.user?.surname);
        this.form.controls['email'].setValue(this.user?.email);
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

  addUser() {
    this.addingUser = true;

    var user: User = {
      id: 0,
      name: this.form.controls['name'].value,
      surname: this.form.controls['surname'].value,
      email: this.form.controls['email'].value,
      dateAdded: new Date(),
      dateLastUpdated: new Date(),
      dateLastLogin: new Date(),
      dateLastLogoff: new Date(),
      isAdmin: false,
      isOnline: false,
      isActivated: true
    }

    this.userSubscription = this.userService.addUser(user).subscribe(
      (response) => {
        console.log(response)
        this.addingUser = false;
        this.snackBar.open("User successfully added.", 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-success'],
        });
        this.closeDialog('success');
      },
      (error) => {
        console.log(error)
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-danger'],
        });
        this.addingUser = false;
      }
    )
  }

  updateUser() {
    this.updatingUser = true;

    this.user.name = this.form.controls['name'].value;
    this.user.surname = this.form.controls['surname'].value;
    this.user.email = this.form.controls['email'].value;

    this.userSubscription = this.userService.updateUser(this.user, this.data.id).subscribe(
      (response) => {
        console.log(response);

        this.snackBar.open("User successfully updated.", 'Close', {
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
        this.updatingUser = false;
      }
    )
  }
}
