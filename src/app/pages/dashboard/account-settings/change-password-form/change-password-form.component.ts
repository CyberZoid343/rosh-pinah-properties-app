import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { PasswordService } from 'src/app/services/password/password.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { User, UserAuthentication, UserNewPassword } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent implements OnDestroy {

  form: FormGroup;
  submitted = false;
  userSubscription: Subscription = new Subscription;
  changingUserPassword = false;

  constructor(
    public formBuilder: FormBuilder,
    public passwordService: PasswordService,
    public userService: UserService,
    public snackBarService: SnackBarService
  ) {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: passwordService.mustMatch('newPassword', 'confirmPassword')
    });
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
      this.updatePassword();
    }
  }

  updatePassword(){
    this.changingUserPassword = true;

    var userNewPassword: UserNewPassword = {
      newPassword: this.form.get('newPassword')!.value,
      confirmPassword: this.form.get('confirmPassword')!.value
    };

    this.userSubscription = this.userService.updatePassword(userNewPassword, this.userService.getLoggedInUserId()).subscribe(
      (response) => {
        console.log(response);

        var auth: UserAuthentication = JSON.parse(localStorage.getItem('auth')!);

        auth.password = this.form.get('newPassword')!.value;

        localStorage.setItem('auth', JSON.stringify(auth));

        this.form.controls['newPassword'].setValue('');
        this.form.controls['confirmPassword'].setValue('');

        this.submitted = false;
        this.changingUserPassword = false;

        this.snackBarService.showSuccessSnackBar("Password successfully updated.")
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.changingUserPassword = false;
      }
    )
  }
}
