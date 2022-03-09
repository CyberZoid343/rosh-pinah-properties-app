import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { DayService } from 'src/app/services/day/day.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { Client, ClientFilters } from 'src/app/shared/interfaces';
import { ClientDeleteComponent } from '../client-delete/client-delete.component';
import { ClientFormComponent } from '../client-form/client-form.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnDestroy {

  clients: Client[] = [];
  clientSubscription: Subscription = new Subscription;
  gettingClientSet = true;
  followUpPeriod = "All";
  clientFilters: ClientFilters;

  constructor(
    public clientService: ClientService,
    public dialog: MatDialog,
    public router: Router,
    public snackBarService: SnackBarService,
    public dayService: DayService
  ) {

    this.clientFilters = {
      search: '',
      status: 'all',
      followUpPeriod: 'all'
    }

    this.getClients()
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  getClients() {
    this.gettingClientSet = true;
    this.clientSubscription = this.clientService.getClientSet(this.clientFilters).subscribe(
      (reponse) => {
        console.log(reponse)
        this.clients = reponse
        this.gettingClientSet = false
      },
      (error) => {
        console.log(error)
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  getDateDays(date: Date){
    return this.dayService.getDateDays(date);
  }

  searchClients(event: any){
    this.clientFilters!.search = event.target.value;
    this.getClients();
  }

  filterByStatus(status: string){
    this.clientFilters!.status = status;
    this.getClients();
  }

  filterByFollowUpPeriod(period: string){
    this.clientFilters!.followUpPeriod = period;
    this.followUpPeriod = period;
    this.getClients();
  }

  openClientFormDialog(id: number) {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      height: '100%',
      width: '700px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getClients();
      }
    });
  }

  openDeleteClientDialog(id: number) {
    const dialogRef = this.dialog.open(ClientDeleteComponent, {
      height: 'auto',
      width: '500px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getClients();
      }
    });
  }

  updateClientStatus(client: Client){

    let successMessage = '';

    if(client.isActive){
      client.isActive = false;
      successMessage = 'Client successfully marked as inactive.'
    }
    else{
      client.isActive = true;
      successMessage = 'Client successfully marked as active.'
    }

    this.clientSubscription = this.clientService.updateClient(client, client.id,).subscribe(
      (response) => {
        console.log(response);
        this.snackBarService.showSuccessSnackBar(successMessage)
        this.getClients();
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

}
