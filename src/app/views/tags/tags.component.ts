import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { TagDetailsComponent } from 'src/app/components/tag-details/tag-details.component';
import { TagFormComponent } from 'src/app/components/tag-form/tag-form.component';
import { Tag } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { TagService } from 'src/app/services/tag/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tagSubscription: Subscription = new Subscription;
  tags: Tag[] = [];

  constructor(
    private tagService: TagService,
    private modalService: NgbModal,
    private messageModalService: MessageModalService
  ) { }

  ngOnDestroy(): void {
    this.tagSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getTagSet();
  }

  getTagSet(){
    this.tagSubscription = this.tagService.getTagSet().subscribe(
      (resposnse) => {
        this.tags = resposnse;
      },
      (error) => {
        console.log(error)
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

  openTagFormModal(){
    const modalRef = this.modalService.open(TagFormComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getTagSet();
      }
    });
  }

  openTagDetailsModal(selectedTag: Tag){
    const modalRef = this.modalService.open(TagDetailsComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.componentInstance.selectedTag = selectedTag;
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getTagSet();
      }
    });
  }
}
