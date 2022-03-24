import { formatDate } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/services/client/client.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { UserService } from 'src/app/services/user/user.service';
import { Client, Tag } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnDestroy, OnInit {

  form: FormGroup;
  submitted = false;
  clientSubscription: Subscription = new Subscription;
  tagSubscription: Subscription = new Subscription;
  client!: Client;
  tags!: Tag[];
  gettingTagSet = false;
  gettingClient = false;
  addingClient = false;
  updatingClient = false;
  today = new Date();
  tagListString: string = '';

  loadingClientsMessage = "Loading client details..."
  loadingTagsMessage = "Loading tags..."

  @Input() id: number | undefined;

  constructor(
    public formBuilder: FormBuilder,
    public clientService: ClientService,
    public tagService: TagService,
    public userService: UserService,
    public companyService: CompanyService,
    public snackBarService: SnackBarService,
    public activeModal: NgbActiveModal,
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      surname: ['', [Validators.required, Validators.maxLength(255)]],
      companyName: ['', Validators.maxLength(500)],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(500)]],
      cellNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
      telNumber: ['', [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(/^-?(0|[0-9]\d*)?$/)]],
      dateLastContacted: ['', [Validators.required]],
      dateFollowUp: ['', Validators.required],
      tags: this.formBuilder.array([])
    });
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
    this.tagSubscription.unsubscribe();
  }

  ngOnInit() {
    this.getTagSet();

    if (this.id! > 0) {
      this.getClient(this.id!);
    }
  }

  toggleTag(event: any){
    const tags = (this.form.controls.tags as FormArray)
    if (event.target.checked){
      tags.push(new FormControl(event.target.value))
    }
    else{
      const index = tags.controls.findIndex(x => x.value === event.target.value)
      tags.removeAt(index);
    }
  }

  buildTagListString(){
    const tags = (this.form.controls.tags as FormArray)
    let str = ''

    tags.controls.forEach(tag => {
      str += tag.value + ',';
    });
    str = str.slice(0, -1);
    return str;
  }

  checkTag(tagName: string){
    const tags = (this.form.controls.tags as FormArray)
    const index = tags.controls.findIndex(x => x.value === tagName)
    if (index > -1){
      return true
    } 
    else{
      return false
    }
  } 

  submit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else {
      if (this.id == 0) {
        this.addClient();
      }
      else {
        this.updateClient();
      }
    }
  }

  closeModal(result: string) {
    this.activeModal.close(result);
  }

  getTagSet(){
    this.gettingTagSet = true;
    this.tagSubscription = this.tagService.getTagSet().subscribe(
      (response) => {
        this.tags = response;
        this.gettingTagSet = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  getClient(id: number) {
    this.gettingClient = true;
    this.clientSubscription = this.clientService.getClient(id).subscribe(
      (response) => {
        console.log(response);
        this.client = response;
        this.form.controls['name'].setValue(this.client?.name);
        this.form.controls['surname'].setValue(this.client?.surname);
        this.form.controls['companyName'].setValue(this.client?.companyName);
        this.form.controls['email'].setValue(this.client?.email);
        this.form.controls['cellNumber'].setValue(this.client?.cellNumber);
        this.form.controls['telNumber'].setValue(this.client?.telNumber);
        this.form.controls['dateLastContacted'].setValue(formatDate(this.client?.dateLastContacted,'yyyy-MM-dd','en'));
        this.form.controls['dateFollowUp'].setValue(formatDate(this.client?.dateFollowUp,'yyyy-MM-dd','en'));  
        this.client?.tags?.split(",")!.forEach(tag => {
          (this.form.controls.tags as FormArray).push(new FormControl(tag))
        });
        this.gettingClient = false;
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  addClient() {
    this.addingClient = true;
    var client: Client = {
      id: 0,
      name: this.form.controls['name'].value,
      surname: this.form.controls['surname'].value,
      companyName: this.form.controls['companyName'].value,
      email: this.form.controls['email'].value,
      cellNumber: this.form.controls['cellNumber'].value,
      telNumber: this.form.controls['telNumber'].value,
      dateLastContacted: this.form.controls['dateLastContacted'].value,
      dateFollowUp: this.form.controls['dateFollowUp'].value,
      lastEditorId: this.userService.getLoggedInUserId(),
      isActive: true,
      tags: this.buildTagListString()
    }
    // this.clientSubscription = this.clientService.addClient(client).subscribe(
    //   (response) => {
    //     console.log(response)
    //     this.snackBarService.showSuccessSnackBar("Client successfully added.")
    //     this.closeModal("confirm")
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.snackBarService.showErrorSnackBar(error.error)
    //     this.addingClient = false
    //   }
    // )
  }

  updateClient() {
    this.updatingClient = true;
    this.client.name = this.form.controls['name'].value;
    this.client.surname = this.form.controls['surname'].value;
    this.client.email = this.form.controls['email'].value;
    this.client.cellNumber = this.form.controls['cellNumber'].value;
    this.client.telNumber = this.form.controls['telNumber']?.value;
    this.client.companyName = this.form.controls['companyName'].value;
    this.client.dateLastContacted = this.form.controls['dateLastContacted'].value;
    this.client.dateFollowUp = this.form.controls['dateFollowUp'].value;
    this.client.lastEditorId = this.userService.getLoggedInUserId();
    this.client.tags = this.buildTagListString()
    console.log(this.client)
    this.clientSubscription = this.clientService.updateClient(this.client, this.id!).subscribe(
      (response) => {
        console.log(response)
        this.snackBarService.showSuccessSnackBar("Client successfully updated.")
        this.closeModal("confirm")
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
        this.updatingClient = false;
      }
    )
  }
}
