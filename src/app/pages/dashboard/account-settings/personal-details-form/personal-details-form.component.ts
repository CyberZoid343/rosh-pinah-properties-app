import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.scss']
})
export class PersonalDetailsFormComponent implements OnDestroy {

  form: FormGroup;
  submitted = false;
  userSubscription: Subscription = new Subscription;
  updatingPersonalDetails = false;
  gettingUserDetails = true;
  user!: User;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      surname: ['', [Validators.required, Validators.maxLength(500)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(500)]]
    });

    this.getUser(this.userService.getLoggedInUserId())
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
      this.updateUser();
    }
  }

  getUser(id: number) {
    this.gettingUserDetails = true;
    this.userSubscription = this.userService.getUser(id).subscribe(
      (response) => {
        console.log(response);
        this.user = response;
        this.form.controls['name'].setValue(this.user?.name);
        this.form.controls['surname'].setValue(this.user?.surname);
        this.form.controls['email'].setValue(this.user?.email);
        this.gettingUserDetails = false;
        this.submitted = false;
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-danger'],
        });
        this.gettingUserDetails = false;
        this.submitted = false;
      }
    )
  }

  updateUser(){
    this.user.name = this.form.get('name')!.value;
    this.user.surname = this.form.get('surname')!.value;
    this.user.email = this.form.get('email')!.value;

    this.userSubscription = this.userService.updateUser(this.user, this.user.id).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        this.updatingPersonalDetails = false;
        this.snackBar.open("Personal details successfully updated.", 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-success'],
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-danger'],
        });
        this.updatingPersonalDetails = false;
      }
    )
  }
}
