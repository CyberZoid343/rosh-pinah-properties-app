import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserNewPassword, User } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-password-form',
  templateUrl: './profile-password-form.component.html',
  styleUrls: ['./profile-password-form.component.scss']
})
export class ProfilePasswordFormComponent implements OnInit {

  userSubscription: Subscription = new Subscription;
  submitted = false;
  form: FormGroup;
  submitting = false;
  loading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageModalService: MessageModalService,
    private router: Router
  ) { 
    this.form = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]],
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {}

  resetForm(){
    this.submitted = false;
    this.form.controls['currentPassword'].setValue('');
    this.form.controls['newPassword'].setValue('');
    this.form.controls['confirmNewPassword'].setValue('');
  }

  submit(){

    this.submitted = true;

    let userNewPassword: UserNewPassword = {
      currentPassword: this.form.controls['currentPassword'].value,
      newPassword: this.form.controls['newPassword'].value,
      confirmNewPassword: this.form.controls['confirmNewPassword'].value,
    }

    if (this.form.valid){
      this.updatePassword(userNewPassword);
    }
    else{
      return;
    }
  }

  updatePassword(userNewPassword: UserNewPassword){

    this.submitting = true;
    let userId: User = JSON.parse(localStorage.getItem('user')!).userId;

    this.userSubscription = this.userService.updatePassword(userNewPassword, Number(userId)).subscribe(
      (response) => {
        this.submitting = false;
        this.messageModalService.showSuccessMessage("Your password has been successfully updated.")
        this.router.navigate(['']);
      },
      (error) => {
        this.submitting = false;
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

}
