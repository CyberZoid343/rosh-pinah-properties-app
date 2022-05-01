import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit, OnDestroy {

  @Input() selectedTag!: Tag;
  tagSubscription: Subscription = new Subscription;
  isUpdateMode = false;
  submitted = false;
  today = new Date();
  form: FormGroup;

  constructor(
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private messageModalService: MessageModalService,
    private datePipe: DatePipe
  ) { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      isClientTag: [true],
      isPropertyTag: [true],
      description: ['']
    })
  }

  ngOnDestroy(): void {
    this.tagSubscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.selectedTag == undefined){
      this.isUpdateMode = false;
    }
    else{
      this.isUpdateMode = true;
      this.setPropertyForm();
    }
  }

  closeModal(result?: any){
    this.activeModal.close(result);
  }

  setPropertyForm(){
    this.form.controls['name'].setValue(this.selectedTag.name);
    this.form.controls['isClientTag'].setValue(this.selectedTag.isClientTag);
    this.form.controls['isPropertyTag'].setValue(this.selectedTag.isPropertyTag);
    this.form.controls['description'].setValue(this.selectedTag.description);
  }

  submit(){

    this.submitted = true;

    let tag: Tag = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      isClientTag: this.form.controls['isClientTag'].value,
      isPropertyTag: this.form.controls['isPropertyTag'].value,
      lastEditor: this.userService.getLoggedInUser().firstName + ' ' + this.userService.getLoggedInUser().lastName
    }

    if (this.form.valid){
      if (!this.isUpdateMode){
        this.addTag(tag);
      }
      else{
        this.updateTag(tag);
      }
    }
    else{
      return;
    }

  }

  addTag(tag: Tag){
    this.tagSubscription = this.tagService.addTag(tag).subscribe(
      (response) => {
        console.log(response);
        this.messageModalService.showSuccessMessage("The tag has been successfully added.")
        this.closeModal("refresh")
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

  updateTag(tag: Tag){
    this.tagSubscription = this.tagService.updateTag(tag, this.selectedTag.tagId!).subscribe(
      (response) => {
        console.log(response);
        this.messageModalService.showSuccessMessage("The tag has been successfully updated.")
        this.closeModal(response)
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

}
