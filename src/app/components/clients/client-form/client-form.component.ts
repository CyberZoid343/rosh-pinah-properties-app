import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { Client } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnDestroy {

  form: FormGroup;
  submitted = false;
  clientSubscription: Subscription = new Subscription;
  client!: Client;
  gettingClient = false;
  addingClient = false;
  updatingClient = false;

  constructor(
    public formBuilder: FormBuilder,
    public clientService: ClientService,
    public userService: UserService,
    public companyService: CompanyService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      surname: ['', [Validators.required, Validators.maxLength(255)]],
      companyName: ['', Validators.maxLength(500)],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(500)]],
      cellNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
      telNumber: ['', [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
      dateLastContacted: ['', Validators.required],
      dateFollowUp: ['', Validators.required]
    });

    if (data.id > 0) {
      this.getClient(data.id);
    }
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    else {
      if (this.data.id == 0) {
        this.addClient();
      }
      else {
        this.updateClient();
      }
    }
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  getClient(id: number) {
    this.gettingClient = true;

    this.clientSubscription = this.clientService.getClient(id).subscribe(
      (response) => {
        console.log(response);
        this.client = response;
        this.form.controls['name'].setValue(this.client?.name);
        this.form.controls['surname'].setValue(this.client?.surname);
        this.form.controls['companyName'].setValue(this.client?.companyName);
        this.form.controls['email'].setValue(this.client?.email);
        this.form.controls['cellNumber'].setValue(this.client?.cellNumber);
        this.form.controls['telNumber'].setValue(this.client?.telNumber);
        this.form.controls['dateLastContacted'].setValue(this.client?.dateLastContacted);
        this.form.controls['dateFollowUp'].setValue(this.client?.dateFollowUp);
        this.gettingClient = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  addClient() {
    this.addingClient = true;

    var client: Client = {
      id: 0,
      name: this.form.controls['name'].value,
      surname: this.form.controls['surname'].value,
      companyName: this.form.controls['companyName'].value,
      email: this.form.controls['email'].value,
      cellNumber: this.form.controls['cellNumber'].value,
      telNumber: this.form.controls['telNumber'].value,
      dateAdded: new Date(),
      dateLastContacted: this.form.controls['dateLastContacted'].value,
      dateFollowUp: this.form.controls['dateFollowUp'].value,
      dateLastUpdated: new Date(),
      isActive: true
    }

    console.log(client);

    this.clientSubscription = this.clientService.addClient(client).subscribe(
      (response) => {
        console.log(response)
        this.snackBarService.showSuccessSnackBar("Client successfully added.")
        this.closeDialog('success')
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.addingClient = false
      }
    )
  }

  updateClient() {
    this.updatingClient = true;
    this.client.name = this.form.controls['name'].value
    this.client.surname = this.form.controls['surname'].value
    this.client.email = this.form.controls['email'].value
    this.client.cellNumber = this.form.controls['cellNumber'].value
    this.client.telNumber = this.form.controls['telNumber']?.value
    this.client.dateLastUpdated = new Date()
    this.client.companyName = this.form.controls['companyName'].value
    this.client.dateLastContacted = this.form.controls['dateLastContacted'].value,
    this.client.dateFollowUp = this.form.controls['dateFollowUp'].value,
    this.client.dateLastUpdated = new Date()

    console.log(this.client)

    this.clientSubscription = this.clientService.updateClient(this.client, this.data.id).subscribe(
      (response) => {
        console.log(response)
        this.snackBarService.showSuccessSnackBar("Client successfully updated.")
        this.closeDialog('success')
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.updatingClient = false;
      }
    )
  }
}
