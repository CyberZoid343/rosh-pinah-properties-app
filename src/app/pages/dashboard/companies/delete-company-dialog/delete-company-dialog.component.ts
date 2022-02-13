import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company/company.service';

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
    public snackBar: MatSnackBar,
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
        this.deletingCompany = false;
        this.snackBar.open("Company successfully deleted.", 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-success'],
        });
        this.closeDialog('success');
      },
      (error) => {
        console.log(error);
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          panelClass: ['alert', 'alert-danger'],
        });
        this.deletingCompany = false;
      }
    )
  }
}
