import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ClientNote } from 'src/app/interfaces';
import { ClientNoteService } from 'src/app/services/clientNote/client-note.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { UserService } from 'src/app/services/user/user.service';

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

  form: FormGroup;
  editForm: FormGroup;

  editClientNoteId = 0;
  submitted = false;
  editSubmitted = false;
  addingClientNote = false;
  updatingClientNote = false;

  currentUser = ''
  currentDate = new Date();

  @Input() id!: number;

  constructor(
    public clientNoteService: ClientNoteService,
    public snackBarService: SnackBarService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public formBuilder: FormBuilder,
    public userService: UserService
  ) { 
    this.form = formBuilder.group({
      description: ['', [Validators.required]]
    })

    this.editForm = formBuilder.group({
      description: ['', [Validators.required]]
    })
  }

  ngOnDestroy() {
    this.clientNoteSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getClientNotes(this.id!);
    this.currentUser = this.userService.getLoggedInUser().name + " " + this.userService.getLoggedInUser().surname
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

  addClientNote(){

    this.addingClientNote = true;
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let clientNote: ClientNote = {
      clientId: this.id,
      description: this.form.controls["description"].value,
      userId: this.userService.getLoggedInUserId(),
      isEdited: false
    }

    this.clientNoteSubscription = this.clientNoteService.addClientNote(clientNote).subscribe(
      (response) => {
        console.log(response)
        this.getClientNotes(this.id)
        this.addingClientNote = false;
        this.submitted = false;
        this.form.controls['description'].setValue('');
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.addingClientNote = false;
        this.submitted = false;
      }
    )
  }

  editClientNote(id: number){
    this.editClientNoteId = id;
    this.editForm.controls['description'].setValue(this.clientNotes.find(x => x.id == id)?.description);
  }

  cancelEditClientNote(){
    this.editClientNoteId = 0;
  }

  updateClientNote(id: number){

    this.updatingClientNote = true;
    this.editSubmitted = true;
    if (this.editForm.invalid) {
      return;
    }

    let clientNote = this.clientNotes.find(x => x.id == id);

    clientNote!.description = this.editForm.controls['description'].value;
    clientNote!.isEdited = true;
    clientNote!.dateUpdated = new Date();

    this.clientNoteSubscription = this.clientNoteService.updateClientNote(clientNote!, id).subscribe(
      (response) => {
        console.log(response);
        this.cancelEditClientNote();
        this.getClientNotes(this.id);
        this.updatingClientNote = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error);
        this.updatingClientNote = false;
      }
    );
  }

  deleteClientNote(id: number){
    this.clientNoteSubscription = this.clientNoteService.deleteClientNote(id).subscribe(
      (response) => {
        console.log(response);
        this.getClientNotes(this.id)
      },
      (error) => {
        console.log(error);
        this.snackBarService.showSuccessSnackBar(error.error)
      }
    )
  }

  isUserNote(userId: number){
    if (userId == this.userService.getLoggedInUserId()){
      return true;
    }
    else{
      return false;
    }
  }
}
