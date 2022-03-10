import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy {

  form: FormGroup;
  submitted = false;
  userSubscription: Subscription = new Subscription;
  user!: User;
  gettingUser = false;
  updatingUser = false;

  constructor(
    public formBuilder: FormBuilder,
    public userService: UserService,
    public snackBarService: SnackBarService,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      surname: ['', [Validators.required, Validators.maxLength(500)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(500)]]
    });
    this.getUser(this.userService.getLoggedInUserId());
  }

  ngOnDestroy(): void {
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
    this.gettingUser = true;
    this.userSubscription = this.userService.getUser(this.userService.getLoggedInUserId()).subscribe(
      (response) => {
        console.log(response);
        this.user = response;
        this.form.controls['name'].setValue(this.user?.name);
        this.form.controls['surname'].setValue(this.user?.surname);
        this.form.controls['email'].setValue(this.user?.email);
        this.gettingUser = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  updateUser() {
    this.updatingUser = true;

    this.user.name = this.form.controls['name'].value;
    this.user.surname = this.form.controls['surname'].value;
    this.user.email = this.form.controls['email'].value;

    this.userSubscription = this.userService.updateUser(this.user, this.userService.getLoggedInUserId()).subscribe(
      (response) => {
        console.log(response);
        this.snackBarService.showSuccessSnackBar("User successfully updated.")
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.updatingUser = false;
      }
    )
  }
}
