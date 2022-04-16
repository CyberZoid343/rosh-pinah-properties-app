import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PasswordService } from 'src/app/services/password/password.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserNewPassword } from 'src/app/interfaces';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnDestroy, OnInit {

  form: FormGroup;
  submitted = false;
  userSubscription: Subscription = new Subscription;
  updatingPassword = false;
  title = "Password"

  constructor(
    public formBuilder: FormBuilder,
    public passwordService: PasswordService,
    public userService: UserService,
    public snackBarService: SnackBarService,
    public router: Router
  ) {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: passwordService.mustMatch('newPassword', 'confirmPassword')
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  resetForm(){
    this.form.get('newPassword')!.setValue('');
    this.form.get('confirmPassword')!.setValue('');
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
    this.updatingPassword = true;

    var userNewPassword: UserNewPassword = {
      newPassword: this.form.get('newPassword')!.value,
      confirmPassword: this.form.get('confirmPassword')!.value
    };

    this.userSubscription = this.userService.updatePassword(userNewPassword, this.userService.getLoggedInUserId()).subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem('user');
        this.router.navigate(['']);
        this.snackBarService.showSuccessSnackBar("Password successfully updated. You may now log in with your new password.")
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.updatingPassword = false;
      }
    )
  }

}
