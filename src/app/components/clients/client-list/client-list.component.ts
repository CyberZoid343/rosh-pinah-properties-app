import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';
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
  lastContactedPeriod = "All"
  clientFilters: ClientFilters;

  constructor(
    public clientService: ClientService,
    public dialog: MatDialog,
    public router: Router,
    public snackBarService: SnackBarService,
    public userService: UserService,
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
    this.clients = [];
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

  refreshClientList(){
    this.getClients();
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

  filterByLastContactedPeriod(period: string){
    this.clientFilters!.lastContactedPeriod = period;
    this.lastContactedPeriod = period;
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

    if(client.isActive){
      client.isActive = false;
    }
    else{
      client.isActive = true;
    }

    client.lastEditorId = this.userService.getLoggedInUserId();
    client.lastEditor!.name = this.userService.getLoggedInUser().name;
    client.lastEditor!.surname = this.userService.getLoggedInUser().surname;

    this.clientSubscription = this.clientService.updateClient(client, client.id,).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

}
