import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { NewUser, User } from 'src/app/shared/interfaces';

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

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      surname: ['', [Validators.required, Validators.maxLength(500)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(500)]]
    });

    if (data.id > 0){
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
      if (this.data.id == 0){
        this.addUser();
      }
      else{
        this.updateUser();
      }
    }
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  getUser(id: number){
    this.userSubscription = this.userService.getUser(id).subscribe(
      (response) => {
        this.user = response;
        this.form.controls['name'].setValue(this.user?.name);
        this.form.controls['surname'].setValue(this.user?.surname);
        this.form.controls['email'].setValue(this.user?.email);
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addUser(){
    var newUser: NewUser = {
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

    this.userSubscription = this.userService.addUser(newUser).subscribe(
      (response) => {
        alert("User successfully added!")
        console.log(response)
        this.closeDialog('added');
      },
      (error) => {
        alert("Error!")
        console.log(error)
      }
    )
  }

  updateUser(){
    this.user.name = this.form.controls['name'].value;
    this.user.surname = this.form.controls['surname'].value;
    this.user.email = this.form.controls['email'].value;

    this.userSubscription = this.userService.updateUser(this.user, this.data.id).subscribe(
      (response) => {
        alert("User successfully updated!")
        console.log(response)
        this.closeDialog('updated');
      },
      (error) => {
        alert("Error!")
        console.log(error)
      }
    )
  }
}
