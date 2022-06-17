import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss']
})
export class TagSelectorComponent implements OnInit {

  tags: string[] = [];

  clientTags: string[] = [
    'Investor',
    'Listed',
    'Developer',
    'Residential',
    'Low Cost',
    'Mixed Use',
    'Student Accommodation',
    'Flats',
    'Retail',
    'Industrial',
    'Commercial',
    'Hotel',
    'Schools',
    'Health Care',
    'Storage Units',
    'Garages',
    'Mining',
    'Contact',
    'Transacted with since 2015',
    'Seller',
    'Buyer',
    'Given offer',
    'Offer accepted',
    'FICA Compliant'
  ]

  propertyTags: string[] = [
    'Land',
    'Listed',
    'Residential',
    'Low Cost',
    'Mixed Use',
    'Student Accommodation',
    'Flats',
    'Retail',
    'Industrial',
    'Commercial',
    'Hotel',
    'Schools',
    'Health Care',
    'Storage Units',
    'Garages',
    'Mining',
    'For Conversion'
  ]

  selectedTags: string[] = [];

  @Input() tagListString!: string;
  @Input() tagType!: string;
  @Output() outputTags = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    this.setupTags();
    this.convertStringToArray()
    this.outputTags.emit(this.selectedTags.toString())
  }

  setupTags() {
    switch (this.tagType) {
      case 'properties':
        this.tags = this.propertyTags;
        break;
      case 'clients':
        this.tags = this.clientTags;
        break;
    }
  }

  convertStringToArray() {
    this.selectedTags = this.tagListString.split(",");
  }

  isSelected(tag: string) {
    if (this.selectedTags.includes(tag)) {
      return true;
    }
    else {
      return false;
    }
  }

  selectTag(tag: string) {

    if (this.selectedTags.includes(tag)) {
      let index = this.selectedTags.indexOf(tag);
      this.selectedTags.splice(index, 1);
    }
    else {
      this.selectedTags.push(tag);
    }

    this.outputTags.emit(this.selectedTags.toString());
  }

}
