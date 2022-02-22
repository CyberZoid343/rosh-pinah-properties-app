import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { Client } from 'src/app/shared/interfaces';
import { ClientFormDialogComponent } from './client-form-dialog/client-form-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];
  clientSubscription: Subscription = new Subscription;
  gettingClients = true;
  gettingClientsError = false;

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
  }

  getClients() {
    this.gettingClients = true;
    this.clientSubscription = this.clientService.getClientSet().subscribe(
      (respone) => {
        console.log(respone)
        this.clients = respone
        this.gettingClients = false
      },
      (error) => {
        console.log(error)
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  openClientFormDialog(id: number) {
    const dialogRef = this.dialog.open(ClientFormDialogComponent, {
      width: '600px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.getClients();
      }
    });
  }

  ngOnInit(): void {
  }

}
