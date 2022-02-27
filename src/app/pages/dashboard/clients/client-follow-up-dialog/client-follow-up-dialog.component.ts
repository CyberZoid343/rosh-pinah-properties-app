import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-client-follow-up-dialog',
  templateUrl: './client-follow-up-dialog.component.html',
  styleUrls: ['./client-follow-up-dialog.component.scss']
})
export class ClientFollowUpDialogComponent implements OnDestroy {

  clientSubscription: Subscription = new Subscription;
  form: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    public clientService: ClientService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ClientFollowUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.form = this.formBuilder.group({
      dateLastContacted: ['',],
      dateFollowUp: ['',],
    });
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  submit(){
    
  }

}
