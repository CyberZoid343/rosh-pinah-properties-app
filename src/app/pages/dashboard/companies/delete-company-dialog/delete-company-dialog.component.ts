import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company/company.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-delete-company-dialog',
  templateUrl: './delete-company-dialog.component.html',
  styleUrls: ['./delete-company-dialog.component.scss']
})
export class DeleteCompanyDialogComponent implements OnDestroy {

  companySubscripteion: Subscription = new Subscription;
  deletingCompany = false;

  constructor(
    public companyService: CompanyService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<DeleteCompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) { }

  ngOnDestroy() {
    this.companySubscripteion.unsubscribe();
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  deleteCompany(){
    this.deletingCompany = true;
    this.companySubscripteion = this.companyService.deleteCompany(this.data.id).subscribe(
      (response) => {
        console.log(response);
        this.snackBarService.showSuccessSnackBar("Company successfully deleted.")
        this.closeDialog('success');
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.deletingCompany = false;
      }
    )
  }
}
