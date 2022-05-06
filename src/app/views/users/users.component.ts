import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserDetailsComponent } from 'src/app/components/user-details/user-details.component';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { User } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  userSubscription: Subscription = new Subscription;
  users: User[] = [];
  loadingUsers = false;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private messageModalService: MessageModalService
  ) { }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserSet();
  }

  getUserSet(){
    this.users = [];
    this.loadingUsers = true;
    this.userSubscription = this.userService.getUserSet().subscribe(
      (resposnse: User[]) => {
        this.users = resposnse;
        this.loadingUsers = false;
      },
      (error) => {
        console.log(error);
        this.messageModalService.showErrorMessage(error.error);
        this.loadingUsers = false;
      }
    )
  }

  openUserFormModal(){
    const modalRef = this.modalService.open(UserFormComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getUserSet();
      }
    });
  }

  openUserDetailsModal(selectedUser: User){
    const modalRef = this.modalService.open(UserDetailsComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.componentInstance.selectedUser = selectedUser;
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getUserSet();
      }
    });
  }

}
