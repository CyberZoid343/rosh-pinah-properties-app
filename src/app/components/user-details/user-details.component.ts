import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnChanges {

  @Input() selectedUserId!: number
  userSubscription: Subscription = new Subscription;
  refreshUserList = false;
  loadingUser = false;
  selectedUser!: User;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private userService: UserService,
    private messageModalService: MessageModalService
  ) { }

  ngOnChanges(): void {
    this.getUser();
  }

  ngOnInit(): void {
    this.getUser();
  }

  closeModal() {
    if (this.refreshUserList){
      this.activeModal.close("refresh");
    }
    else{
      this.activeModal.close();
    }
  }

  getUser(){
    this.userSubscription = this.userService.getUser(this.selectedUserId).subscribe(
      (response: User) =>{
        this.selectedUser = response;
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

  openUserFormModal() {
    const modalRef = this.modalService.open(UserFormComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.componentInstance.selectedUser = this.selectedUser;
    modalRef.result.then((result) => {
      if (result) {
        this.getUser();
        this.refreshUserList = true;
      }
    });
  }

  deleteUser(){
    const modalRef = this.modalService.open(DeleteMessageComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.message = "Are you sure you want to delete this user?";
    modalRef.result.then((result) => {
      if (result == "delete") {
        this.userSubscription = this.userService.deleteUser(this.selectedUser.userId!).subscribe(
          (response) => {
            console.log(response);
            this.messageModalService.showSuccessMessage("The user was successfully deleted");
            this.refreshUserList = true;
            this.closeModal();
          },
          (error) => {
            console.error(error);
            this.messageModalService.showErrorMessage(error.error)
          }
        )
      }
    });
  }

}
