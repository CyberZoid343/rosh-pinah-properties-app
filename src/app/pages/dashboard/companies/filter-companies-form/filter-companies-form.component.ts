import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';
import { CompaniesComponent } from '../companies.component';

@Component({
  selector: 'app-filter-companies-form',
  templateUrl: './filter-companies-form.component.html',
  styleUrls: ['./filter-companies-form.component.scss']
})
export class FilterCompaniesFormComponent {

  @Input() showFilters = true;
  @Input() total = 0;
  form: FormGroup;
  submitted = false;
  urlFilterParameters = '';
  users: User[] = [];
  userSubscription: Subscription = new Subscription;
  gettingUsers = true;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public companies: CompaniesComponent,
    public userService: UserService,
    public snackBarService: SnackBarService
  ) {
    this.form = this.formBuilder.group({
      search: [''],
      dateAddedMin: [''],
      dateAddedMax: [''],
      dateLastUpdatedMin: [''],
      dateLastUpdatedMax: [''],
      lastEditor: ['']
    })

    this.getUsers();
  }

  getUsers() {
    this.gettingUsers = true;
    this.userSubscription = this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.gettingUsers = false;
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
      this.updateCompanyFilters();
    }
  }

  reset(){
    this.form.controls['search'].setValue('');
    this.form.controls['dateAddedMin'].setValue('');
    this.form.controls['dateAddedMax'].setValue('');
    this.form.controls['dateLastUpdatedMin'].setValue('');
    this.form.controls['dateLastUpdatedMax'].setValue('');
    this.form.controls['lastEditor'].setValue('');
    this.updateCompanyFilters();
  }

  searchCompanies(event: any){
    this.router.navigate(
      ['dashboard/companies'],
      {
        queryParams: {
          search: event.target.value
        }
      }
    );
  }

  updateCompanyFilters() {
    this.router.navigate(
      ['dashboard/companies'],
      {
        queryParams: {
          search: this.form.get('search')!.value,
          dateAddedMin: this.form.get('dateAddedMin')!.value,
          dateAddedMax: this.form.get('dateAddedMax')!.value,
          dateLastUpdatedMin: this.form.get('dateLastUpdatedMin')!.value,
          dateLastUpdatedMax: this.form.get('dateLastUpdatedMax')!.value,
          lastEditor: this.form.get('lastEditor')!.value,
        }
      }
    );
  }
}
