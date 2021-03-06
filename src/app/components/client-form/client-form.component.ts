import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces';
import { ClientService } from 'src/app/services/client/client.service';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { UserService } from 'src/app/services/user/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnDestroy {

  @Input() selectedClient!: Client;

  clientSubscription: Subscription = new Subscription;
  tagSelectorSubscription: Subscription = new Subscription;
  isUpdateMode = false;

  form: FormGroup
  submitted = false;
  today = new Date()
  submittingClient = false;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private clientService: ClientService,
    private messageModalService: MessageModalService,
    private datePipe: DatePipe
  ) { 
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      cellphone: [''],
      telephone: [''],
      officeRegion: [''],
      officeAddress: [''],
      recentInfo: [''],
      dateLastContacted: [''],
      dateFollowUp: [''],
      tags: []
    })
  }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.selectedClient == undefined){
      this.isUpdateMode = false;
    }
    else{
      this.isUpdateMode = true;
      this.setClientForm();
    }
  }

  setClientForm(){
    this.form.controls.firstName.setValue(this.selectedClient.firstName);
    this.form.controls.lastName.setValue(this.selectedClient.lastName);
    this.form.controls.company.setValue(this.selectedClient.company);
    this.form.controls.email.setValue(this.selectedClient.email);
    this.form.controls.cellphone.setValue(this.selectedClient.cellphone);
    this.form.controls.telephone.setValue(this.selectedClient.telephone);
    this.form.controls.officeRegion.setValue(this.selectedClient.officeRegion);
    this.form.controls.officeAddress.setValue(this.selectedClient.officeAddress);
    this.form.controls.recentInfo.setValue(this.selectedClient.recentInfo);
    this.form.controls.dateLastContacted.setValue(this.datePipe.transform(this.selectedClient.dateLastContacted, 'yyyy-MM-dd'));
    this.form.controls.dateFollowUp.setValue(this.datePipe.transform(this.selectedClient.dateFollowUp, 'yyyy-MM-dd'));
    this.form.controls.tags.setValue(this.selectedClient.tags);
  }

  closeModal(result?: any){
    this.activeModal.close(result);
  }

  getSelectedTags(selectedTags: string){
    this.form.controls.tags.setValue(selectedTags);
  }

  submit(){

    this.submitted = true;

    let client: Client = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      company: this.form.controls.company.value,
      email: this.form.controls.email.value,
      cellphone: this.form.controls.cellphone.value,
      telephone: this.form.controls.telephone.value,
      officeAddress: this.form.controls.officeAddress.value,
      officeRegion: this.form.controls.officeRegion.value,
      lastEditorId: this.userService.getLoggedInUser().userId!,
      recentInfo: this.form.controls.recentInfo.value,
      dateLastContacted: this.form.controls.dateLastContacted.value,
      dateFollowUp: this.form.controls.dateFollowUp.value,
      tags: this.form.controls.tags.value
    }

    if (this.form.valid){
      if (!this.isUpdateMode){
        this.addClient(client);
      }
      else{
        this.updateClient(client);
      }
    }
    else{
      return;
    }
  }

  addClient(client: Client){
    this.submittingClient = true;
    this.clientSubscription = this.clientService.addClient(client).subscribe(
      (response: Client) => {
        this.messageModalService.showSuccessMessage("The client has been successfully added.");
        this.closeModal('refresh');
      },
      (error) => {
        this.submittingClient = false;
        console.error(error);
        this.messageModalService.showErrorMessage(error.error);
      }
    )
  }

  updateClient(client: Client){
    this.submittingClient = true;
    client.clientId = this.selectedClient.clientId!;
    this.clientSubscription = this.clientService.updateClient(client, client.clientId).subscribe(
      (response) => {
        this.messageModalService.showSuccessMessage("The client has been successfully updated.");
        this.closeModal(response);
      },
      (error) => {
        this.submittingClient = false;
        console.error(error);
        this.messageModalService.showErrorMessage(error.error);
      }
    )
  }

}
