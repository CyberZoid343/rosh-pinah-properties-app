import { UserService } from './../../services/user/user.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  form: FormGroup;
  submitted = false;
  loggingIn = false;
  userSubscription: Subscription = new Subscription;

  constructor(
    public userService: UserService,
    public router: Router,
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      email: ['luke2000.greyling@gmail.com', [Validators.required, Validators.email, Validators.maxLength(500)]],
      password: ['Admin', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  //Check if the form is valid
  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      this.login();
    }
  }

  //Check if the user is authorized
  login() {
    try {
      this.loggingIn = true;

      var auth = {
        email: this.form.get('email')!.value,
        password: this.form.get('password')!.value,
      }

      localStorage.setItem('auth', JSON.stringify(auth));

      this.userSubscription = this.userService.login(auth).subscribe(
        (user) => {
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard/account-settings']);
          this.loggingIn = false;
        },
        (error) => {
          console.error(error);
          this.snackBar.open(error.error, 'Close', {
            duration: 5000,
            panelClass: ['alert', 'alert-danger'],
          });
          this.loggingIn = false;
        }
      );
    } catch (error) {
      alert("Oops! Something went wrong. Please try agin or contact IT support for assistance.")
    }
  }
}
