import { Component, Inject, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { UserService } from 'src/app/services/user/user.service';
import { Client, ClientTag, Tag } from 'src/app/shared/interfaces';
import { Company } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-client-form-dialog',
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.scss']
})
export class ClientFormDialogComponent implements OnDestroy {

  form: FormGroup;
  submitted = false;
  clientId = 1;
  clientSubscription: Subscription = new Subscription;
  client!: Client;
  gettingClient = false;
  addingClient = false;
  updatingClient = false;
  companies: Company[] = [];
  companySubscription: Subscription = new Subscription;
  gettingCompanies = true;

  constructor(
    public formBuilder: FormBuilder,
    public clientService: ClientService,
    public userService: UserService,
    public companyService: CompanyService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ClientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]],
      surname: ['', [Validators.required, Validators.maxLength(500)]],
      company: ['', [Validators.required, Validators.maxLength(500)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(500)]],
      cellNumber: ['', [Validators.required, Validators.maxLength(10)]],
      telNumber: ['', [Validators.maxLength(10)]],
      dateLastContacted: ['', [Validators.required]],
      dateFollowUp: ['', [Validators.required]],
    });

    if (data.id > 0) {
      this.getClient(data.id);
    }

    this.getCompanies();
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  getCompanies() {
    this.companySubscription = this.companyService.getCompanySet().subscribe(
      (companies) => {
        this.companies = companies;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
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
      companyId: this.form.controls['company'].value,
      email: this.form.controls['email'].value,
      cellNumber: this.form.controls['cellNumber'].value,
      telNumber: this.form.controls['telNumber'].value,
      dateLastContacted: this.form.controls['dateLastContacted'].value,
      dateFollowUp: this.form.controls['dateFollowUp'].value,
      dateAdded: new Date(),
      dateLastUpdated: new Date(),
      lastEditor: this.userService.getLoggedInUserFullName(),
    }

    console.log(client);

    // this.clientSubscription = this.clientService.addClient(client).subscribe(
    //   (response) => {
    //     console.log(response)
    //     this.snackBarService.showSuccessSnackBar("Client successfully added.")
    //     this.closeDialog('success')
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.snackBarService.showErrorSnackBar(error.error)
    //     this.addingClient = false
    //   }
    // )
  }

  updateClient() {
    this.updatingClient = true;

    this.client.name = this.form.controls['name'].value
    this.client.lastEditor = this.userService.getLoggedInUserFullName()

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
