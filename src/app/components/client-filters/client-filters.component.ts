import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageModalService } from './../../services/message-modal/message-modal.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-client-filters',
  templateUrl: './client-filters.component.html',
  styleUrls: ['./client-filters.component.scss']
})
export class ClientFiltersComponent implements OnInit {

  form: FormGroup

  constructor(
    private messageModalService: MessageModalService,
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
