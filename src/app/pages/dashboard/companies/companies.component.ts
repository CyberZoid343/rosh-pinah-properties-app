import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company/company.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { Company } from 'src/app/shared/interfaces';
import { CompanyFormDialogComponent } from './company-form-dialog/company-form-dialog.component';
import { DeleteCompanyDialogComponent } from './delete-company-dialog/delete-company-dialog.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnDestroy {

  companies: Company[] = [];
  companySubscription: Subscription = new Subscription;
  gettingCompanies = true;
  gettingCompaniesError = false;
  showFilters = false;

  constructor(
    public companyService: CompanyService,
    public dialog: MatDialog,
    public router: Router,
    public snackBarService: SnackBarService
  ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getCompanies()
      }
    });
  }

  ngOnDestroy() {
    this.companySubscription.unsubscribe();
  }

  displayFilters() {
    if (!this.showFilters) {
      this.showFilters = true
    }
    else {
      this.showFilters = false
    }
  }

  getCompanies() {
    this.gettingCompanies = true;
    this.companySubscription = this.companyService.getCompanySet().subscribe(
      (respone) => {
        console.log(respone)
        this.companies = respone
        this.gettingCompanies = false
      },
      (error) => {
        console.log(error)
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  openCompanyFormDialog(id: number) {
    const dialogRef = this.dialog.open(CompanyFormDialogComponent, {
      width: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getCompanies();
      }
    });
  }

  openDeleteCompanyDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteCompanyDialogComponent, {
      width: '400px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getCompanies();
      }
    });
  }
}
