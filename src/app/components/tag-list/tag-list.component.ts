import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

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

  ngOnInit(): void {
    if (this.tagListString) {
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
