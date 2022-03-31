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
import { ExcelService } from 'src/app/services/excel/excel.service';

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
  order: string = '';
  status: string = '';
  followUp: string = '';
  lastContacted: string = '';
  filterTags: string = '';

  //stats
  totalActive = 0;
  totalInactive = 0;
  totalFollowUpTomorrow = 0;
  totalFollowUpToday = 0;
  totalFollowUpOverdue = 0;

  constructor(
    public modalService: NgbModal,
    public clientService: ClientService,
    public dialog: MatDialog,
    public router: Router,
    public route: ActivatedRoute,
    public snackBarService: SnackBarService,
    public userService: UserService,
    public excelService: ExcelService
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
        this.setClientSetStats();
        this.gettingClientSet = false
      },
      (error) => {
        console.log(error)
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  setClientSetStats() {

    this.totalActive = 0;
    this.totalInactive = 0;
    this.totalFollowUpTomorrow = 0;
    this.totalFollowUpToday = 0;
    this.totalFollowUpOverdue = 0;

    this.clients.forEach(client => {

      if (client.isActive && this.status != "inactive") {
        this.totalActive += 1;
      }
      else if (!client.isActive && this.status != "active") {
        this.totalInactive += 1;
      }

      if (client.isActive) {
        if (client.followUpDays! == 1) {
          this.totalFollowUpTomorrow += 1;
        }
        if (client.followUpDays! == 0) {
          this.totalFollowUpToday += 1;
        }
        if (client.followUpDays! <= -1) {
          this.totalFollowUpOverdue += 1;
        }
      }

    });
  }

  setFilters() {
    this.route.queryParams.subscribe(params => {

      if (params['order'] != undefined) {
        this.order = params['order'].replace("_", " ");
      }
      else {
        this.order = "Date Added";
      }

      if (params['status'] != undefined) {
        this.status = params['status'].replace("_", " ");
      }
      else {
        this.status = "all";
      }

      if (params['follow_up'] != undefined) {
        this.followUp = params['follow_up'].replace("_", " ");
      }
      else {
        this.followUp = "all";
      }

      if (params['last_contacted'] != undefined) {
        this.lastContacted = params['last_contacted'].replace("_", " ");
      }
      else {
        this.lastContacted = "all";
      }

      if (params['tags'] != undefined) {
        this.filterTags = params['tags'].replace("_", " ");
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

  orderBy(order: string) {
    this.router.navigate([], {
      queryParams: {
        order: order,
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
    const modalRef = this.modalService.open(ClientFormComponent, { size: 'md', scrollable: true, centered: true });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result == "confirm") {
        this.getClientSet();
      }
    });
  }

  deleteClient(id: number) {
    const modalRef = this.modalService.open(ModalConfirmComponent, { size: 'md', scrollable: true, centered: true });
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
    const modalRef = this.modalService.open(ClientDetailsComponent, { size: 'md', scrollable: true, centered: true });
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result == "reload") {
        this.getClientSet();
      }
    });
  }

  highlighIfInTagFilter(tagName: string) {
    console.log(tagName)
    let index = this.filterTags.split(",").indexOf(tagName);
    if (index > -1) {
      return "bg-primary"
    }
    else {
      return "";
    }
  }

  exportExcel() {

    let headers = [
      "Id",
      "Name",
      "Surname",
      "Company",
      "Tags",
      "Email",
      "Cell Number",
      "Tel Number",
      "Last Contacted",
      "Follow Up",
      "Date Added",
      "Date Updated",
      "Last Editor",
      "Recent Information"
    ]

    let formattedClientData: any = []

    this.clients.forEach(client => {
      let formattedClient = {
        id: client.id,
        name: client.name,
        surname: client.surname,
        company: client.companyName,
        tags: client.tags,
        email: client.email,
        cellNumber: client.cellNumber,
        telNumberL: client.telNumber,
        dateLastContacted: client.dateLastContacted,
        dateFollowUp: client.dateFollowUp,
        dateAdded: client.dateAdded,
        dateUpdated: client.dateUpdated,
        lastEditor: client.lastEditor?.name + " " + client.lastEditor?.surname,
      }
      formattedClientData.push(formattedClient);
    });

    this.excelService.exportAsExcelFile(formattedClientData, headers, "Clients");
  }
}
