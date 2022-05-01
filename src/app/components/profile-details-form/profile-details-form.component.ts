import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile-details-form',
  templateUrl: './profile-details-form.component.html',
  styleUrls: ['./profile-details-form.component.scss']
})
export class ProfileDetailsFormComponent implements OnInit, OnDestroy {

  userSubscription: Subscription = new Subscription;
  submitted = false;
  today = new Date();
  form: FormGroup;
  isAdmin = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private messageModalService: MessageModalService
  ) { 
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.setUserForm();
  }

  setUserForm(){
    this.userSubscription = this.userService.getUser(JSON.parse(localStorage.getItem("user")!).userId).subscribe(
      (response: User) => {
        this.form.controls['firstName'].setValue(response.firstName);
        this.form.controls['lastName'].setValue(response.lastName);
        this.form.controls['email'].setValue(response.email);
        this.isAdmin = response.isAdmin!;
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

  submit(){
    this.submitted = true;
    let user: User = {
      userId: JSON.parse(localStorage.getItem("user")!).userId,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['email'].value,
      isAdmin: this.isAdmin
    }

    if (this.form.valid){
      this.updateUser(user);
    }
    else{
      return;
    }
  }

  updateUser(user: User){
    this.userSubscription = this.userService.updateUser(user, user.userId!).subscribe(
      (response) => {
        console.log(response);
        this.messageModalService.showSuccessMessage("Your profile has been successfully updated.")
        localStorage.setItem('user', JSON.stringify(response));
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

}
