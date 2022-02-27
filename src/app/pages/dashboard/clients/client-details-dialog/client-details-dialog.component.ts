import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-client-details-dialog',
  templateUrl: './client-details-dialog.component.html',
  styleUrls: ['./client-details-dialog.component.scss']
})
export class ClientDetailsDialogComponent implements OnDestroy {

  clientSubscription: Subscription = new Subscription;
  deletingClient = false;

  constructor(
    public clientService: ClientService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ClientDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) { }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}
