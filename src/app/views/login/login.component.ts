import { MessageModalService } from './../../services/message-modal/message-modal.service';
import { UserService } from '../../services/user/user.service';
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
  loggingIn = false;
  userSubscription: Subscription = new Subscription;

  constructor(
    public userService: UserService,
    public router: Router,
    public formBuilder: FormBuilder,
    private messageModalService: MessageModalService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(500)]],
      password: ['', [Validators.required, Validators.maxLength(500)]]
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
      this.login();
    }
  }

  login() {
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
        this.router.navigate(['/dashboard/clients/']);
        this.loggingIn = false;
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error);
        this.loggingIn = false;
      });
  }
}
