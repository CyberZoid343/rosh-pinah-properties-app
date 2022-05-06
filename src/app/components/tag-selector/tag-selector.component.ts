import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss']
})
export class TagSelectorComponent implements OnInit {

  @Input() tags: string = '';
  @Output() selectedTags: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { 
    this.selectedTags.emit(this.tags);
  }

  isSelected(tagId: number){
    // const tag = this.tags.find((tag) => {
    //   return tag.tagId === tagId && tag.isSelected === true;
    // })
    // this.selectedTags.emit(this.tags);
    // if (tag){
    //   return true;
    // }
    // else{
    //   return false;
    // }
  }

  selectTag(tagId: number){

    // const tag = this.tags.find((tag) => {
    //   return tag.tagId === tagId;
    // })

    // if (tag!.isSelected){
    //   tag!.isSelected = false;
    // }
    // else{
    //   tag!.isSelected = true;
    // }

    this.selectedTags.emit(this.tags);

  }

}
