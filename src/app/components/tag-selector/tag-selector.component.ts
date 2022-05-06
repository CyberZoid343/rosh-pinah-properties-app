import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-tag-selector',
  templateUrl: './tag-selector.component.html',
  styleUrls: ['./tag-selector.component.scss']
})
export class TagSelectorComponent implements OnInit {

  tags: string[] = [
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
    'Contact'
  ]
  selectedTags: string [] = [];

  @Input() tagListString!: string;
  @Output() outputTags = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void { 
    if (this.tagListString){
      this.convertStringToArray();
    }
    this.outputTags.emit(this.selectedTags.toString())
  }

  convertStringToArray(){
    this.selectedTags = this.tagListString.split(",");
  }

  isSelected(tag: string){
    if (this.selectedTags.includes(tag)){
      return true;
    }
    else{
      return false;
    }
  }

  selectTag(tag: string){

    if (this.selectedTags.includes(tag)){
      let index = this.selectedTags.indexOf(tag);
      this.selectedTags.splice(index, 1);
    }
    else{
      this.selectedTags.push(tag);
    }

    this.outputTags.emit(this.selectedTags.toString());
  }

}
