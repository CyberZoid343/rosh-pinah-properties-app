import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from 'src/app/interfaces';

@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss']
})
export class TagSelectorComponent implements OnInit {

  @Input() tags: Tag[] = [];
  @Output() selectedTags: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

  constructor() { }

  ngOnInit(): void { 
    this.selectedTags.emit(this.tags);
  }

  isSelected(tagId: number){

    const tag = this.tags.find((tag) => {
      return tag.tagId === tagId && tag.isSelected === true;
    })
    this.selectedTags.emit(this.tags);
    if (tag){
      return true;
    }
    else{
      return false;
    }

  }

  selectTag(tagId: number){

    const tag = this.tags.find((tag) => {
      return tag.tagId === tagId;
    })

    if (tag!.isSelected){
      tag!.isSelected = false;
    }
    else{
      tag!.isSelected = true;
    }

    this.selectedTags.emit(this.tags);

  }

}
