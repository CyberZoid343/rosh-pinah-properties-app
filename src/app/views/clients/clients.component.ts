import { ExcelService } from './../../services/excel/excel.service';
import { ClientFiltersComponent } from './../../components/client-filters/client-filters.component';
import { ClientSet } from './../../interfaces';
import { HttpHeaders } from '@angular/common/http';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, NavigationStart, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ClientDetailsComponent } from 'src/app/components/client-details/client-details.component';
import { ClientFormComponent } from 'src/app/components/client-form/client-form.component';
import { Client } from 'src/app/interfaces';
import { ClientService } from 'src/app/services/client/client.service';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  clientSubscription: Subscription = new Subscription;
  clients: Client[] = [];
  loadingClients = false;
  resultsFound = 0;
  currentPage = 1;
  totalPages = 1;
  search = new FormControl()
  routeSubsctiption: Subscription = new Subscription;

  constructor(
    private clientService: ClientService,
    private modalService: NgbModal,
    private messageModalService: MessageModalService,
    public route: ActivatedRoute,
    private router: Router,
    private excelService: ExcelService
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.getClientSet();
      }
    });
  }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getClientSet();
  }

  searchClients() {
    if (!this.loadingClients) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: 1,
          search: this.search.value
        },
        queryParamsHandling: 'merge',
        skipLocationChange: false
      });
    }
  }

  showClientFiltersForm() {
    const modalRef = this.modalService.open(ClientFiltersComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getClientSet();
      }
    });
  }

  handlePaging(increment: number) {
    this.currentPage += increment;
    if (this.currentPage > 0) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: this.currentPage
        },
        queryParamsHandling: 'merge',
        skipLocationChange: false
      });
    }
  }

  clearFilters() {
    this.search.setValue(null);
    this.router.navigate([]);
  }

  downloadExcel() {

    this.loadingClients = true;
    let clients: Client[] = [];
    let tempClients = this.clients;
    this.clients = [];

    this.clientSubscription = this.clientService.getClientSetForExcel().subscribe(
      (response: ClientSet) => {

        clients = response.clients;

        let headers = [
          "Id",
          "Name",
          "Surname",
          "Company",
          "Tags",
          "Email",
          "Cell Number",
          "Tel Number",
          "Office Region",
          "Office Address",
          "Last Contacted",
          "Follow Up",
          "Date Added",
          "Date Updated",
          "Last Editor",
          "Recent Information"
        ]

        let formattedClientData: any = []

        clients.forEach(client => {
          let formattedClient = {
            id: client.clientId,
            name: client.firstName,
            surname: client.lastName,
            company: client.company,
            tags: client.tags,
            email: client.email,
            cellNumber: client.cellphone,
            telNumberL: client.telephone,
            officeRegion: client.officeRegion,
            officeAddress: client.officeAddress,
            dateLastContacted: client.dateLastContacted,
            dateFollowUp: client.dateFollowUp,
            dateAdded: client.dateAdded,
            dateUpdated: client.dateUpdated,
            lastEditor: client.lastEditor?.firstName + " " + client.lastEditor?.lastName,
            recentInformation: client.recentInfo,
          }
          formattedClientData.push(formattedClient);
        });

        this.excelService.exportAsExcelFile(formattedClientData, headers, "Clients");
        this.loadingClients = false;
        this.clients = tempClients;
      },
      (error) => {
        console.log(error)
        this.messageModalService.showErrorMessage(error.error)
        this.loadingClients = false;
        this.clients = tempClients;
      }
    )
  }

  getClientSet() {
    this.clients = [];
    this.loadingClients = true;
    this.clientSubscription = this.clientService.getClientSet().subscribe(
      (response: ClientSet) => {
        this.clients = response.clients;
        this.resultsFound = response.resultsFound;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
        this.loadingClients = false;
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
        this.loadingClients = false;
      }
    )
  }

  openClientFormModal() {
    const modalRef = this.modalService.open(ClientFormComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getClientSet();
      }
    });
  }

  openClientDetailsModal(selectedClient: Client) {
    const modalRef = this.modalService.open(ClientDetailsComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.componentInstance.clientId = selectedClient.clientId;
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getClientSet();
      }
    });
  }
}
