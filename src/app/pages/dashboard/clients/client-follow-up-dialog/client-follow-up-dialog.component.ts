import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { Client } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-client-follow-up-dialog',
  templateUrl: './client-follow-up-dialog.component.html',
  styleUrls: ['./client-follow-up-dialog.component.scss']
})
export class ClientFollowUpDialogComponent implements OnDestroy {

  clientSubscription: Subscription = new Subscription;
  form: FormGroup;
  submitted = false;
  updatingClient = false;
  gettingClient = false;
  client!: Client;
  minDate = new Date().toISOString().split('T')[0];

  constructor(
    public formBuilder: FormBuilder,
    public clientService: ClientService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ClientFollowUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.form = this.formBuilder.group({
      dateLastContacted: ['',[Validators.required,]],
      dateFollowUp: ['',Validators.required],
    });
    this.getClient(this.data.id);
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  submit(){
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    else {
        this.updateClient();
    }
  }

  getClient(id: number) {
    this.gettingClient = true;

    this.clientSubscription = this.clientService.getClient(id).subscribe(
      (response) => {
        console.log(response);
        this.client = response;
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

  updateClient() {
    this.updatingClient = true;

    this.client.dateLastContacted = this.form.controls['dateLastContacted'].value
    this.client.dateFollowUp = this.form.controls['dateFollowUp'].value

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
