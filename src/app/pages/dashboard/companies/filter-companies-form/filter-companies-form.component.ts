import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompaniesComponent } from '../companies.component';

@Component({
  selector: 'app-filter-companies-form',
  templateUrl: './filter-companies-form.component.html',
  styleUrls: ['./filter-companies-form.component.scss']
})
export class FilterCompaniesFormComponent {

  @Input() showFilters = true;
  form: FormGroup;
  submitted = false;
  urlFilterParameters = '';

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public companies: CompaniesComponent
  ) {
    this.form = this.formBuilder.group({
      search: ['',],
      dateAddedMin: ['',],
      dateAddedMax: ['',],
      dateLastUpdatedMin: ['',],
      dateLastUpdatedMax: ['',]
    })
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

  updateCompanyFilters() {
    this.router.navigate(
      ['dashboard/companies'],
      {
        queryParams: {
          search: this.form.get('search')!.value
        }
      }
    );
    this.companies.getCompanies();
  }
}
