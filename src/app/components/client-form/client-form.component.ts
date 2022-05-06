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
  tagSubscription: Subscription = new Subscription;
  isUpdateMode = false;

  form: FormGroup
  submitted = false;
  today = new Date()

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
      recentInfo: [''],
      dateLastContacted: [''],
      dateFollowUp: [''],
    })
  }

  ngOnDestroy(): void {
    this.clientSubscription.unsubscribe();
    this.tagSubscription.unsubscribe();
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
    this.form.controls['firstName'].setValue(this.selectedClient.firstName);
    this.form.controls['lastName'].setValue(this.selectedClient.lastName);
    this.form.controls['company'].setValue(this.selectedClient.company);
    this.form.controls['email'].setValue(this.selectedClient.email);
    this.form.controls['cellphone'].setValue(this.selectedClient.cellphone);
    this.form.controls['telephone'].setValue(this.selectedClient.telephone);
    this.form.controls['recentInfo'].setValue(this.selectedClient.recentInfo);
    this.form.controls['dateLastContacted'].setValue(this.datePipe.transform(this.selectedClient.dateLastContacted, 'yyyy-MM-dd'));
    this.form.controls['dateFollowUp'].setValue(this.datePipe.transform(this.selectedClient.dateFollowUp, 'yyyy-MM-dd'));
  }

  closeModal(result?: any){
    this.activeModal.close(result);
  }

  submit(){
    this.submitted = true;

    let client: Client = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      company: this.form.controls['company'].value,
      email: this.form.controls['email'].value,
      cellphone: this.form.controls['cellphone'].value,
      telephone: this.form.controls['telephone'].value,
      lastEditor: this.userService.getLoggedInUser().firstName + ' ' + this.userService.getLoggedInUser().lastName,
      recentInfo: this.form.controls['recentInfo'].value,
      dateLastContacted: this.form.controls['dateLastContacted'].value,
      dateFollowUp: this.form.controls['dateFollowUp'].value,
      tags: ''
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
    this.clientSubscription = this.clientService.addClient(client).subscribe(
      (response) => {
        this.messageModalService.showSuccessMessage("The client has been successfully added.");
        this.closeModal('refresh');
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error);
      }
    )
  }

  updateClient(client: Client){
    client.clientId = this.selectedClient.clientId!;
    this.clientSubscription = this.clientService.updateClient(client, client.clientId).subscribe(
      (response) => {
        this.messageModalService.showSuccessMessage("The client has been successfully updated.");
        this.closeModal(response);
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error);
      }
    )
  }

}
