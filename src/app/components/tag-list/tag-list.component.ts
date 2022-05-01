import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/interfaces';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  constructor() { }

  @Input() tags: Tag[] = [];

  ngOnInit(): void { }

  isSelected(tagId: number){

    const tag = this.tags.find((tag) => {
      return tag.tagId === tagId && tag.isSelected === true;
    })

    if (tag){
      return true;
    }
    else{
      return false;
    }

  }

}
