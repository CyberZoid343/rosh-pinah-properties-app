import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { Client } from 'src/app/shared/interfaces';
import { ClientFormDialogComponent } from './client-form-dialog/client-form-dialog.component';
import { ClientsTagsDialogComponent } from './clients-tags-dialog/clients-tags-dialog.component';
import { DeleteClientDialogComponent } from './delete-client-dialog/delete-client-dialog.component';
import { ClientDetailsDialogComponent } from './client-details-dialog/client-details-dialog.component';
import { ClientFollowUpDialogComponent } from './client-follow-up-dialog/client-follow-up-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

  clients: Client[] = [];
  clientSubscription: Subscription = new Subscription;
  gettingClients = true;
  gettingClientsError = false;
  showFilters = false;

  constructor(
    public clientService: ClientService,
    public dialog: MatDialog,
    public router: Router,
    public snackBarService: SnackBarService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getClients()
      }
    });

    this.getClients()
  }

  displayFilters() {
    if (!this.showFilters) {
      this.showFilters = true
    }
    else {
      this.showFilters = false
    }
  }

  getClients() {
    this.gettingClients = true;
    this.clientSubscription = this.clientService.getClientSet().subscribe(
      (reponse) => {
        console.log(reponse)
        this.clients = reponse
        console.log(this.clients)
        this.gettingClients = false
      },
      (error) => {
        console.log(error)
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  openViewClientDetailsDialog(id: number) {
    const dialogRef = this.dialog.open(ClientDetailsDialogComponent, {
      height: '100%',
      width: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getClients();
      }
    });
  }

  openClientFormDialog(id: number) {
    const dialogRef = this.dialog.open(ClientFormDialogComponent, {
      height: '100%',
      width: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getClients();
      }
    });
  }

  openClientTagsDialog(id: number) {
    const dialogRef = this.dialog.open(ClientsTagsDialogComponent, {
      height: '100%',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getClients();
      }
    });
  }

  openClientFollowUpDialog(id: number) {
    const dialogRef = this.dialog.open(ClientFollowUpDialogComponent, {
      height: '100%',
      width: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getClients();
      }
    });
  }

  openDeleteClientDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent, {
      height: 'auto',
      width: '400px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getClients();
      }
    });
  }
}
