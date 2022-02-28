import { Component, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company/company.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { Company } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-company-form-dialog',
  templateUrl: './company-form-dialog.component.html',
  styleUrls: ['./company-form-dialog.component.scss']
})
export class CompanyFormDialogComponent implements OnDestroy {

  form: FormGroup;
  submitted = false;
  companyId = 1;
  companySubscription: Subscription = new Subscription;
  company!: Company;
  gettingCompany = false;
  addingCompany = false;
  updatingCompany = false;
  nullCompany = null;

  constructor(
    public formBuilder: FormBuilder,
    public companyService: CompanyService,
    public userService: UserService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<CompanyFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(500)]]
    });

    if (data.id > 0) {
      this.getCompany(data.id);
    }
  }

  ngOnDestroy() {
    this.companySubscription.unsubscribe();
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      if (this.data.id == 0) {
        this.addCompany();
      }
      else {
        this.updateCompany();
      }
    }
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  getCompany(id: number) {
    this.gettingCompany = true;
    this.companySubscription = this.companyService.getCompany(id).subscribe(
      (response) => {
        console.log(response);
        this.company = response;
        this.form.controls['name'].setValue(this.company?.name);
        this.gettingCompany = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  addCompany() {
    this.addingCompany = true;

    var company: Company = {
      id: 0,
      name: this.form.controls['name'].value,
      dateAdded: new Date(),
      dateLastUpdated: new Date(),
      lastEditor: ''
    }

    this.companySubscription = this.companyService.addCompany(company).subscribe(
      (response) => {
        console.log(response)
        this.snackBarService.showSuccessSnackBar("Company successfully added.")
        this.closeDialog('success')
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.addingCompany = false
      }
    )
  }

  updateCompany() {
    this.updatingCompany = true;

    this.company.name = this.form.controls['name'].value
    this.company.lastEditor = ''

    this.companySubscription = this.companyService.updateCompany(this.company, this.data.id).subscribe(
      (response) => {
        console.log(response)
        this.snackBarService.showSuccessSnackBar("Company successfully updated.")
        this.closeDialog('success')
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.updatingCompany = false;
      }
    )
  }
}
