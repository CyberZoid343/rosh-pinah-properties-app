import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Input() selectedUser!: User;
  userSubscription: Subscription = new Subscription;
  isUpdateMode = false;
  submitted = false;
  today = new Date();
  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private messageModalService: MessageModalService,
    private datePipe: DatePipe
  ) { 
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      isAdmin: ['']
    })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.selectedUser == undefined){
      this.isUpdateMode = false;
    }
    else{
      this.isUpdateMode = true;
      this.setUserForm();
    }
  }

  closeModal(result?: any){
    this.activeModal.close(result);
  }

  setUserForm(){
    this.form.controls['firstName'].setValue(this.selectedUser.firstName);
    this.form.controls['lastName'].setValue(this.selectedUser.lastName);
    this.form.controls['email'].setValue(this.selectedUser.email);
    this.form.controls['isAdmin'].setValue(this.selectedUser.isAdmin);
  }

  submit(){

    this.submitted = true;

    let user: User = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['email'].value,
      isAdmin: this.form.controls['isAdmin'].value,
    }

    if (this.form.valid){
      if (!this.isUpdateMode){
        this.addUser(user);
      }
      else{
        this.updateUser(user);
      }
    }
    else{
      return;
    }

  }

  addUser(user: User){
    this.userSubscription = this.userService.addUser(user).subscribe(
      (response) => {
        console.log(response);
        this.messageModalService.showSuccessMessage("The user has been successfully added.")
        this.closeModal("refresh")
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

  updateUser(user: User){
    this.userSubscription = this.userService.updateUser(user, this.selectedUser.userId!).subscribe(
      (response) => {
        console.log(response);
        this.messageModalService.showSuccessMessage("The user has been successfully updated.")
        this.closeModal(response)
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

}
