import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces';
import { ClientService } from 'src/app/services/client/client.service';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  @Input() clientId!: number

  selectedClient!: Client;
  clientSubscription: Subscription = new Subscription;
  refreshClientList = false;
  tags = ''
  loadingClient = false;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private clientService: ClientService,
    private messageModalService: MessageModalService
  ) { }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getClient();
  }

  closeModal(result?: any){
    if (this.refreshClientList){
      this.activeModal.close('refresh');
    }
    else{
      this.activeModal.close(result);
    }
  }

  getClient(){
    this.loadingClient = true;
    this.clientSubscription = this.clientService.getClient(this.clientId).subscribe(
      (response: Client) => {
        this.loadingClient = false;
        this.selectedClient = response;
      },
      (error) => {
        this.loadingClient = false;
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

  openClientFormModal() {
    const modalRef = this.modalService.open(ClientFormComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.componentInstance.selectedClient = this.selectedClient;
    modalRef.result.then((result) => {
      if (result) {
        this.getClient();
        this.refreshClientList = true;
      }
    });
  }

  deleteClient(){
    const modalRef = this.modalService.open(DeleteMessageComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.message = "Are you sure you want to delete this client?";
    modalRef.result.then((result) => {
      if (result == "delete") {
        this.clientSubscription = this.clientService.deleteClient(this.selectedClient.clientId!).subscribe(
          (response) => {
            console.log(response);
            this.messageModalService.showSuccessMessage("The client was successfully deleted");
            this.refreshClientList = true;
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
