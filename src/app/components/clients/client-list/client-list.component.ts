import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { Client, Tag } from 'src/app/shared/interfaces';
import { ClientFormComponent } from '../client-form/client-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfirmComponent } from '../../shared/modal-confirm/modal-confirm.component';
import { ClientDetailsComponent } from '../client-details/client-details.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnDestroy {

  clients: Client[] = [];
  clientSubscription: Subscription = new Subscription;
  gettingClientSet = true;
  loadingClientsMessage = "Loading clients..."

  //filters
  status: string = 'all';
  followUp: string = 'all';
  lastContacted: string = 'all';
  filterTags: string = '';

  constructor(
    public modalService: NgbModal,
    public clientService: ClientService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    public snackBarService: SnackBarService,
    public userService: UserService,
  ) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.setFilters()
          this.getClientSet()
        }
      }
    );
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  getClientSet() {
    this.clients = [];
    this.gettingClientSet = true;
    this.clientSubscription = this.clientService.getClientSet().subscribe(
      (reponse) => {
        console.log(reponse)
        this.clients = reponse
        this.clients.forEach(client => {
          client.tagArray = client.tags?.split(",")!
        });
        this.gettingClientSet = false
      },
      (error) => {
        console.log(error)
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  setFilters() {
    this.route.queryParams.subscribe(params => {
      if (params['status'] != undefined) {
        this.status = params['status'];
      }
      else {
        this.status = "all";
      }
      if (params['follow_up'] != undefined) {
        this.followUp = params['follow_up'];
      }
      else {
        this.followUp = "all";
      }
      if (params['last_contacted'] != undefined) {
        this.lastContacted = params['last_contacted'];
      }
      else {
        this.lastContacted = "all";
      }
      if (params['tags'] != undefined) {
        this.filterTags = params['tags'];
      }
      else {
        this.filterTags = "";
      }
    });
  }

  refreshClientList() {
    this.getClientSet();
  }

  clearFilters() {
    this.router.navigate([]);
  }

  searchClients(event: any) {
    this.router.navigate([], {
      queryParams: {
        search: event.target.value
      },
      queryParamsHandling: 'merge',
    });
  }

  filterByStatus(status: string) {
    this.router.navigate([], {
      queryParams: {
        status: status
      },
      queryParamsHandling: 'merge',
    });
  }

  filterByFollowUpPeriod(period: string) {
    this.router.navigate([], {
      queryParams: {
        follow_up: period,
        last_contacted: 'all'
      },
      queryParamsHandling: 'merge',
    });
  }

  filterByLastContactedPeriod(period: string) {
    this.router.navigate([], {
      queryParams: {
        last_contacted: period,
        follow_up: 'all'
      },
      queryParamsHandling: 'merge',
    });
  }

  openClientFormDialog(id: number) {
    const modalRef = this.modalService.open(ClientFormComponent, { size: 'md', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result == "confirm") {
        this.getClientSet();
      }
    });
  }

  deleteClient(id: number) {
    const modalRef = this.modalService.open(ModalConfirmComponent, { size: 'md', scrollable: true });
    modalRef.componentInstance.title = "Delete Client";
    modalRef.componentInstance.message = "Are you sure you want to delete this client? All data linked to the client will be removed.";
    modalRef.componentInstance.action = "Delete Client";
    modalRef.componentInstance.themeClass = "danger";
    modalRef.componentInstance.iconClass = "fa-solid fa-circle-exclamation";
    modalRef.result.then((result) => {
      if (result == "confirm") {
        this.clientSubscription = this.clientService.deleteClient(id).subscribe(
          (response) => {
            console.log(response);
            this.snackBarService.showSuccessSnackBar("Client successfully deleted.")
            this.getClientSet()
          },
          (error) => {
            console.log(error);
            this.snackBarService.showErrorSnackBar(error.error)
          }
        )
      }
    });
  }

  updateClientStatus(client: Client) {
    if (client.isActive) {
      client.isActive = false;
    }
    else {
      client.isActive = true;
    }
    client.lastEditorId = this.userService.getLoggedInUserId();
    client.lastEditor!.name = this.userService.getLoggedInUser().name;
    client.lastEditor!.surname = this.userService.getLoggedInUser().surname;
    this.clientSubscription = this.clientService.updateClient(client, client.id).subscribe(
      (response) => {
        this.getClientSet();
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  openClientDetailsDialog(id: number) {
    const modalRef = this.modalService.open(ClientDetailsComponent, { size: 'md', scrollable: true });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result == "reload") {
        this.getClientSet();
      }
    });
  }

  highlighIfInTagFilter(tagName: string){
    console.log(tagName)
    let index = this.filterTags.split(",").indexOf(tagName);
    if (index > -1){
      return "bg-primary"
    }
    else{
      return "";
    }
  }
}
