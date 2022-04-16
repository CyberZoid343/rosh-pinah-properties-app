import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-client-list-bad',
  templateUrl: './client-list-bad.component.html',
  styleUrls: ['./client-list-bad.component.scss']
})
export class ClientListBadComponent implements OnInit {

  clients: Client[] = [];
  clientSubscription: Subscription = new Subscription;
  loadingClientSet = true;
  loadingClientSetMessage = "Loading clients..."

  //filters
  order: string = '';
  status: string = '';
  followUp: string = '';
  lastContacted: string = '';
  filterTags: string = '';

  constructor(
    public clientService: ClientService,
    public snackBarService: SnackBarService,
    public router: Router,
    public route: ActivatedRoute,
    public modalService: NgbModal
  ) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.getClientSet()
        }
      }
    );
  }

  ngOnInit(): void {

  }

  getClientSet() {
    this.clients = [];
    this.loadingClientSet = true;
    this.clientSubscription = this.clientService.getClientSet().subscribe(
      (reponse) => {
        console.log(reponse)
        this.clients = reponse
        this.clients.forEach(client => {
          client.tagArray = client.tags?.split(",")!
        });
        this.loadingClientSet = false
      },
      (error) => {
        console.log(error)
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  highlighIfInTagFilter(tagName: string) {
    let index = this.filterTags.split(",").indexOf(tagName);
    if (index > -1) {
      return "bg-primary"
    }
    else {
      return "";
    }
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
}
