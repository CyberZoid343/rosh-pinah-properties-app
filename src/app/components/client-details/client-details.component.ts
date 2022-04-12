import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { Client, Tag } from 'src/app/interfaces';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnDestroy, OnInit {

  clientSubscription: Subscription = new Subscription;
  client!: Client;
  tags!: Tag[];
  gettingClient = false;
  isEdited = false;
  loadingClientMessage = "Loading client details..."
  @Input() id: number | undefined;

  constructor(
    public clientService: ClientService,
    public snackBarService: SnackBarService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
  ) { }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getClient(this.id!);
  }

  closeModal(result: string) {
    if (this.isEdited){
      this.activeModal.close("reload");
    }
    else{
      this.activeModal.close(result);
    }
  }

  getClient(id: number) {
    this.gettingClient = true;
    this.clientSubscription = this.clientService.getClient(id).subscribe(
      (response) => {
        console.log(response);
        this.client = response;
        this.client.tagArray = this.client.tags?.split(",")!
        this.gettingClient = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  openEditClientModal(){
    const modalRef = this.modalService.open(ClientFormComponent, { size: 'md', scrollable: true });
    modalRef.componentInstance.id = this.id;
    modalRef.result.then((result) => {
      if (result == "confirm") {
        this.getClient(this.id!);
        this.isEdited = true;
      }
    });
  }
}
