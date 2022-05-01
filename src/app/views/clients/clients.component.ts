import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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
  searchIsVisible = false;

  loadingClients = false;

  constructor(
    private clientService: ClientService,
    private modalService: NgbModal,
    private messageModalService: MessageModalService
  ) { }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getClientSet();
  }

  showSeach(){
    if (this.searchIsVisible){
      this.searchIsVisible = false;
    }
    else{
      this.searchIsVisible = true;
    }
  }

  getClientSet(){
    this.loadingClients = true;
    this.clientSubscription = this.clientService.getClientSet().subscribe(
      (resposnse) => {
        this.clients = resposnse;
        this.loadingClients = false;
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
        this.loadingClients = false;
      }
    )
  }

  openClientFormModal(){
    const modalRef = this.modalService.open(ClientFormComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getClientSet();
      }
    });
  }

  openClientDetailsModal(selectedClient: Client){
    const modalRef = this.modalService.open(ClientDetailsComponent, { size: 'lg', scrollable: true, centered: true })
    modalRef.componentInstance.clientId = selectedClient.clientId;
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getClientSet();
      }
    });
  }
}
