import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { PropertyService } from 'src/app/services/property/property.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit, OnDestroy {

  @Input() selectedProperty!: Property;
  propertySubscription: Subscription = new Subscription;
  isUpdateMode = false;
  submitted = false;
  today = new Date();
  form: FormGroup;

  constructor(
    private propertyService: PropertyService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private userService: UserService,
    private messageModalService: MessageModalService,
    private datePipe: DatePipe
  ) { 
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      owner: ['', [Validators.required]],
      price: [''],
      dateLoi: ['']
    })
  }

  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }

  ngOnInit(): void {
    if (this.selectedProperty == undefined){
      this.isUpdateMode = false;
    }
    else{
      this.isUpdateMode = true;
      this.setPropertyForm();
    }
  }

  closeModal(result?: any){
    this.activeModal.close(result);
  }

  setPropertyForm(){
    this.form.controls['name'].setValue(this.selectedProperty.name);
    this.form.controls['owner'].setValue(this.selectedProperty.owner);
    this.form.controls['price'].setValue(this.selectedProperty.price);
    this.form.controls['dateLoi'].setValue(this.datePipe.transform(this.selectedProperty.dateLoi, 'yyyy-MM-dd'));
  }

  submit(){
    this.submitted = true;

    let property: Property = {
      name: this.form.controls['name'].value,
      owner: this.form.controls['owner'].value,
      price: this.form.controls['price'].value,
      dateLoi: this.form.controls['dateLoi'].value,
      lastEditor: this.userService.getLoggedInUser().firstName + ' ' + this.userService.getLoggedInUser().lastName,
      tags: ''
    }

    if (this.form.valid){
      if (!this.isUpdateMode){
        this.addProperty(property);
      }
      else{
        this.updateProperty(property);
      }
    }
    else{
      return;
    }

  }

  addProperty(property: Property){
    this.propertySubscription = this.propertyService.addProperty(property).subscribe(
      (response) => {
        console.log(response);
        this.messageModalService.showSuccessMessage("The property has been successfully added.")
        this.closeModal("refresh")
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

  updateProperty(property: Property){
    this.propertySubscription = this.propertyService.updateProperty(property, this.selectedProperty.propertyId!).subscribe(
      (response) => {
        console.log(response);
        this.messageModalService.showSuccessMessage("The property has been successfully updated.")
        this.closeModal(response)
      },
      (error) => {
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }
}
