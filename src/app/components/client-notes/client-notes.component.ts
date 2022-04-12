import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ClientNote } from 'src/app/interfaces';
import { ClientNoteService } from 'src/app/services/clientNote/client-note.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';

@Component({
  selector: 'app-client-notes',
  templateUrl: './client-notes.component.html',
  styleUrls: ['./client-notes.component.scss']
})
export class ClientNotesComponent implements OnInit {

  clientNoteSubscription: Subscription = new Subscription;
  loadingClientNotes = false;
  loadingClientNotesMessage = "Loading client notes..."
  clientNotes: ClientNote[] = []
  @Input() id: number | undefined;

  constructor(
    public clientNoteService: ClientNoteService,
    public snackBarService: SnackBarService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
  ) { }

  ngOnDestroy() {
    this.clientNoteSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getClientNotes(this.id!);
  }

  closeModal(result: string) {
    this.activeModal.close(result);
  }

  getClientNotes(id: number) {
    this.loadingClientNotes = true;
    this.clientNoteSubscription = this.clientNoteService.getClientNoteSet(id).subscribe(
      (response) => {
        console.log(response);
        this.clientNotes = response;
        this.loadingClientNotes = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }
}
