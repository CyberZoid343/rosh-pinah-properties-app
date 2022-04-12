import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/interfaces';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {

  users: User[] = [];
  userSubscription: Subscription = new Subscription;
  gettingUserSet = true;
  loadingUsersMessage = "Loading users...";

  constructor(
    public userService: UserService,
    public modalService: NgbModal,
    public snackBarService: SnackBarService
  ) {
    this.getUserSet();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  getUserSet() {
    this.gettingUserSet = true;
    this.userSubscription = this.userService.getUserSet().subscribe(
      (response) => {
        console.log(response)
        this.users = response;
        this.gettingUserSet = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  openUserFormDialog(id: number) {
    const modalRef = this.modalService.open(UserFormComponent, { size: 'md', scrollable: true, centered: true });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result == "confirm") {
        this.getUserSet();
      }
    });
  }

  openDeactivateUserDialog(user: User) {
    const modalRef = this.modalService.open(ModalConfirmComponent, { size: 'md', scrollable: true, centered: true });
    modalRef.componentInstance.title = "Deactivate Client";
    modalRef.componentInstance.message = "Are you sure you want to Deactivate this user? The user will not be able to log in.";
    modalRef.componentInstance.action = "Deactivate Client";
    modalRef.componentInstance.themeClass = "danger";
    modalRef.componentInstance.iconClass = "fa-solid fa-circle-exclamation";
    modalRef.result.then((result) => {
      if (result == "confirm") {
        user.isActivated = false;
        this.userSubscription = this.userService.updateUser(user, user.id,).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
            this.snackBarService.showErrorSnackBar(error.error)
          }
        )
      }
    });
  }

  openActivateUserDialog(user: User) {
    const modalRef = this.modalService.open(ModalConfirmComponent, { size: 'md', scrollable: true, centered: true });
    modalRef.componentInstance.title = "Ativate User";
    modalRef.componentInstance.message = "Are you sure you want to activate this user? The user will be able to log in.";
    modalRef.componentInstance.action = "Ativate User";
    modalRef.componentInstance.themeClass = "success";
    modalRef.componentInstance.iconClass = "fa-solid fa-circle-exclamation";
    modalRef.result.then((result) => {
      if (result == "confirm") {
        user.isActivated = true;
        this.userSubscription = this.userService.updateUser(user, user.id,).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
            this.snackBarService.showErrorSnackBar(error.error)
          }
        )
      }
    });
  }

  openDeleteUserDialog(id: number) {
    const modalRef = this.modalService.open(ModalConfirmComponent, { size: 'md', scrollable: true, centered: true });
    modalRef.componentInstance.title = "Delete User";
    modalRef.componentInstance.message = "Are you sure you want to delete this user? All data linked to the user will be removed.";
    modalRef.componentInstance.action = "Delete User";
    modalRef.componentInstance.themeClass = "danger";
    modalRef.componentInstance.iconClass = "fa-solid fa-circle-exclamation";
    modalRef.result.then((result) => {
      if (result == "confirm") {
        this.userSubscription = this.userService.deleteUser(id).subscribe(
          (response) => {
            console.log(response);
            this.snackBarService.showSuccessSnackBar("User successfully deleted.")
            this.getUserSet()
          },
          (error) => {
            console.log(error);
            this.snackBarService.showErrorSnackBar(error.error)
          }
        )
      }
    });
  }
}
