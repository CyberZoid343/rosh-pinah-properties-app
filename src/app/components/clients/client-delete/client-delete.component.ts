import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.scss']
})
export class ClientDeleteComponent implements OnDestroy {

  clientSubscription: Subscription = new Subscription;
  deletingClient = false;

  constructor(
    public clientService: ClientService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ClientDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ) { }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  deleteClient(){
    this.deletingClient = true;
    this.clientSubscription = this.clientService.deleteClient(this.data.id).subscribe(
      (response) => {
        console.log(response);
        this.snackBarService.showSuccessSnackBar("Client successfully deleted.")
        this.closeDialog('success');
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.deletingClient = false;
      }
    )
  }
}
