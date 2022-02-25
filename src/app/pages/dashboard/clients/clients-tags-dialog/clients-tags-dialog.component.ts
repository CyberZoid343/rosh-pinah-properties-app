import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { Client, ClientTag, Tag } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-clients-tags-dialog',
  templateUrl: './clients-tags-dialog.component.html',
  styleUrls: ['./clients-tags-dialog.component.scss']
})
export class ClientsTagsDialogComponent {

  gettingClientTags = false;
  tagSubscription: Subscription = new Subscription;
  tags: Tag[] = [];
  clientTags: ClientTag[] = [];

  constructor(
    public tagService: TagService,
    public snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<ClientsTagsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
  ) { 
    this.getTags();
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }

  getTags() {
    this.gettingClientTags = true;
    this.tagSubscription = this.tagService.getTagSet().subscribe(
      (response) => {
        this.tags = response;
        this.gettingClientTags = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  onCheckChange(event: any) {
    if (event.target.checked) {
      var clientTag: ClientTag = {
        clientId: this.data.id,
        tagId: event.target.value
      }
      this.clientTags.push(clientTag);
    }
    else {
      for (let i = 0; i < this.clientTags.length; i++) {
        if (this.clientTags[i].tagId == event.target.value) {
          this.clientTags = this.clientTags.filter(clientTag => clientTag.tagId !==  event.target.value);
        }
      }
    }
    console.log(this.clientTags);
  }
}
