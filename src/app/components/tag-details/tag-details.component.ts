import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';
import { TagFormComponent } from '../tag-form/tag-form.component';

@Component({
  selector: 'app-tag-details',
  templateUrl: './tag-details.component.html',
  styleUrls: ['./tag-details.component.scss']
})
export class TagDetailsComponent implements OnInit {

  @Input() selectedTag!: Tag

  tagSubscription: Subscription = new Subscription;

  refreshTagList = false;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private tagService: TagService,
    private messageModalService: MessageModalService
  ) { }

  ngOnInit(): void { }

  closeModal() {
    if (this.refreshTagList){
      this.activeModal.close("refresh");
    }
    else{
      this.activeModal.close();
    }
  }

  openTagFormModal() {
    const modalRef = this.modalService.open(TagFormComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.componentInstance.selectedTag = this.selectedTag;
    modalRef.result.then((result) => {
      if (result) {
        this.selectedTag = result;
        this.refreshTagList = true;
      }
    });
  }

  deleteTag(){
    const modalRef = this.modalService.open(DeleteMessageComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.message = "Are you sure you want to delete this tag?";
    modalRef.result.then((result) => {
      if (result == "delete") {
        this.tagSubscription = this.tagService.deleteTag(this.selectedTag.tagId!).subscribe(
          (response) => {
            console.log(response);
            this.messageModalService.showSuccessMessage("The tag was successfully deleted");
            this.refreshTagList = true;
            this.closeModal();
          },
          (error) => {
            console.error(error);
            this.messageModalService.showErrorMessage(error.error)
          }
        )
      }
    });
  }

}
