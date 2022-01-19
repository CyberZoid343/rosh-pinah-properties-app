import { UserService } from './../../services/user/user.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  form: FormGroup;
  submitted = false;
  loading = false;
  showFailedLoginAlert = false;
  userSubscription: Subscription = new Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      email: ['luke2000.greyling@gmail.com', [Validators.required, Validators.email, Validators.maxLength(500)]],
      password: ['Admin', [Validators.required, Validators.maxLength(500)]]
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
      this.loading = true;
      this.login();
    }
  }

  closeAlert(){
    this.showFailedLoginAlert = false;
  }

  login() {
    try {
      var auth = {
        email: this.form.get('email')!.value,
        password: this.form.get('password')!.value,
      }

      this.userSubscription = this.userService.login(auth).subscribe(
        (user) => {
          localStorage.setItem('user', JSON.stringify(user))
          this.router.navigate(['/dashboard/clients']);
          this.loading = false;
        },
        (error) => {
          console.error("Login: " + error)
          this.showFailedLoginAlert = true;
          this.loading = false;
        }
      );
    } catch (error) {
      alert("Oops! Something went wrong. Please try agin or contact IT support for assistance.")
    }
  }
}
