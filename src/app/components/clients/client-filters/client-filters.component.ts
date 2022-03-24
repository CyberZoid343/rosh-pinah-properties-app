import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SnackBarService } from 'src/app/services/snackBar/snack-bar.service';
import { TagService } from 'src/app/services/tag/tag.service';
import { Tag } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-client-filters',
  templateUrl: './client-filters.component.html',
  styleUrls: ['./client-filters.component.scss']
})
export class ClientFiltersComponent implements OnInit {

  gettingTagSet = false;
  tagSubscription: Subscription = new Subscription;
  tags!: Tag[];
  loadingTagsMessage = "Loading tags..."
  form: FormGroup;

  constructor(
    public tagService: TagService,
    public snackBarService: SnackBarService,
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute
  ) { 
    this.form = this.formBuilder.group({
      tags: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.getTagSet();
  }

  setFilters() {
    this.route.queryParams.subscribe(params => {
      if (params['tags'] != undefined) {
        let tags = params['tags'];
        (this.form.controls.tags as FormArray).clear();
        tags.split(",")!.forEach((tag: any) => {
          (this.form.controls.tags as FormArray).push(new FormControl(tag))
        });
      }
      else {
        (this.form.controls.tags as FormArray).clear();
      }
    });
  }

  getTagSet(){
    this.gettingTagSet = true;
    this.tagSubscription = this.tagService.getTagSet().subscribe(
      (response) => {
        this.tags = response;
        this.gettingTagSet = false;
        this.setFilters();
      },
      (error) => {
        console.log(error);
        this.snackBarService.showErrorSnackBar(error.error)
      }
    )
  }

  toggleTag(event: any){
    const tags = (this.form.controls.tags as FormArray)
    if (event.target.checked){
      tags.push(new FormControl(event.target.value))
    }
    else{
      const index = tags.controls.findIndex(x => x.value === event.target.value)
      tags.removeAt(index);
    }
    this.filterByTag();
  }

  buildTagListString(){
    const tags = (this.form.controls.tags as FormArray)
    let str = ''
    tags.controls.forEach(tag => {
      str += tag.value + ',';
    });
    str = str.slice(0, -1);
    return str;
  }

  checkTag(tagName: string){
    const tags = (this.form.controls.tags as FormArray)
    const index = tags.controls.findIndex(x => x.value === tagName)
    if (index > -1){
      return true
    } 
    else{
      return false
    }
  } 

  filterByTag(){
    this.router.navigate([], {
      queryParams: {
        tags: this.buildTagListString()
      },
      queryParamsHandling: 'merge',
    });
  }
}
