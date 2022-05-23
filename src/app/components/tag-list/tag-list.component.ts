import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit, OnChanges {

  @Input() tagListString!: string;
  @Input() selectedTagListString!: string;

  tags: string[] = [];
  urlTags = '';

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.urlTags = params['tags'];
    });
  }

  ngOnChanges(): void {
    this.setTags();
  }

  ngOnInit(): void {
    this.setTags();
  }

  setTags(){
    if (this.tagListString){
      this.tags = this.tagListString.split(',');
    }
  }

  isInUrl(tag: string) {
    if (this.urlTags?.includes(tag)) {
      return true;
    }
    else {
      return false;
    }
  }

}
