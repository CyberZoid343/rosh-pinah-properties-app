import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder, 
  ) { 
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(500)]],
      password: ['', [Validators.required, Validators.maxLength(500)]]
    });
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


  login() {
    try {
      var auth = {
        email: this.form.get('email')!.value,
        password: this.form.get('password')!.value,
      }

      this.userService.login(auth).subscribe(
        (response) => {
          localStorage.setItem('user', JSON.stringify(response)) 
          this.router.navigate(['/dashboard/clients']);
          this.loading = false;
        },
        (error) => {
          alert("Incorrect email or password. Please try agin.")
          this.loading = false;
        }
      );
    } catch (error) {
      alert("Oops! Something went wrong. Please try agin or contact IT support for assistance.")
    }
  }

}
