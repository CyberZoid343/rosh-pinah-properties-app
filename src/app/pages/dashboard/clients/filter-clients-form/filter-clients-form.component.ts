import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/shared/interfaces';
import { ClientsComponent } from '../clients.component';

@Component({
  selector: 'app-filter-clients-form',
  templateUrl: './filter-clients-form.component.html',
  styleUrls: ['./filter-clients-form.component.scss']
})
export class FilterClientsFormComponent {

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
    public clients: ClientsComponent,
    public userService: UserService,
    public snackBarService: SnackBarService
  ) {
    this.form = this.formBuilder.group({
      search: [''],
      dateAddedStart: [''],
      dateAddedEnd: [''],
      dateLastUpdatedStart: [''],
      dateLastUpdatedEnd: [''],
      dateLastContactedStart: [''],
      dateLastContactedEnd: [''],
      dateFollowUpStart: [''],
      dateFollowUpEnd: [''],
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
      this.updateClientFilters();
    }
  }

  reset(){
    this.form.controls['search'].setValue('');
    this.form.controls['dateAddedStart'].setValue('');
    this.form.controls['dateAddedEnd'].setValue('');
    this.form.controls['dateLastUpdatedStart'].setValue('');
    this.form.controls['dateLastUpdatedEnd'].setValue('');
    this.form.controls['dateLastContactedStart'].setValue('');
    this.form.controls['dateLastContactedEnd'].setValue('');
    this.form.controls['dateFollowUpStart'].setValue('');
    this.form.controls['dateFollowUpEnd'].setValue('');
    this.form.controls['lastEditor'].setValue('');
    this.updateClientFilters();
  }

  searchClients(event: any){
    this.router.navigate(
      ['dashboard/clients'],
      {
        queryParams: {
          search: event.target.value
        }
      }
    );
  }

  updateClientFilters() {
    this.router.navigate(
      ['dashboard/clients'],
      {
        queryParams: {
          search: this.form.get('search')!.value,
          dateAddedStart: this.form.get('dateAddedStart')!.value,
          dateAddedEnd: this.form.get('dateAddedEnd')!.value,
          dateLastUpdatedStart: this.form.get('dateLastUpdatedStart')!.value,
          dateLastUpdatedEnd: this.form.get('dateLastUpdatedEnd')!.value,
          dateLastContactedStart: this.form.get('dateLastContactedStart')!.value,
          dateLastContactedEnd: this.form.get('dateLastContactedEnd')!.value,
          dateFollowUpStart: this.form.get('dateFollowUpStart')!.value,
          dateFollowUpEnd: this.form.get('dateFollowUpEnd')!.value,
          lastEditor: this.form.get('lastEditor')!.value,
        }
      }
    );
  }

}
