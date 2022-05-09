import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';

@Component({
  selector: 'app-property-filters',
  templateUrl: './property-filters.component.html',
  styleUrls: ['./property-filters.component.scss']
})
export class PropertyFiltersComponent implements OnInit {

  form: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) { 
    this.form = this.formBuilder.group({
      tags: [null]
    })
  }

  ngOnInit(): void {
    this.setForm();
  }

  closeModal(result?: any){
    this.activeModal.close(result);
  }

  getSelectedTags(selectedTags: string){
    this.form.controls.tags.setValue(selectedTags);
  }

  setForm(){
    this.route.queryParams.subscribe(params => {
      if (params['tags']){
        this.form.controls.tags.setValue(params['tags']);
      }
    });
  }

  submit(){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: 1,
        tags: this.form.controls.tags.value 
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
    this.closeModal("Refresh")
  }

}
