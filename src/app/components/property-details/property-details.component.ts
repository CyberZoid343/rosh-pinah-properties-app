import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Property } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { PropertyService } from 'src/app/services/property/property.service';
import { DeleteMessageComponent } from '../delete-message/delete-message.component';
import { PropertyFormComponent } from '../property-form/property-form.component';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() propertyId!: number
  selectedProperty!: Property;
  propertySubscription: Subscription = new Subscription;
  refreshPropertyList = false;
  loadingProperty = false;

  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private propertyService: PropertyService,
    private messageModalService: MessageModalService
  ) { }

  ngOnChanges(): void {
    this.getProperty();
  }

  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getProperty();
  }

  closeModal() {
    if (this.refreshPropertyList){
      this.activeModal.close("refresh");
    }
    else{
      this.activeModal.close();
    }
  }

  getProperty(){
    this.loadingProperty = true;
    this.propertySubscription = this.propertyService.getProperty(this.propertyId).subscribe(
      (response: Property) => {
        this.loadingProperty = false;
        this.selectedProperty = response;
      },
      (error) => {
        this.loadingProperty = false;
        console.error(error);
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

  openPropertyFormModal() {
    const modalRef = this.modalService.open(PropertyFormComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.componentInstance.selectedProperty = this.selectedProperty;
    modalRef.result.then((result) => {
      if (result) {
        this.getProperty();
        this.refreshPropertyList = true;
      }
    });
  }

  deleteProperty(){
    const modalRef = this.modalService.open(DeleteMessageComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.message = "Are you sure you want to delete this property?";
    modalRef.result.then((result) => {
      if (result == "delete") {
        this.propertySubscription = this.propertyService.deleteProperty(this.selectedProperty.propertyId!).subscribe(
          (response) => {
            console.log(response);
            this.messageModalService.showSuccessMessage("The property was successfully deleted");
            this.refreshPropertyList = true;
            this.closeModal();
          },
          (error) => {
            console.error(error);
            this.messageModalService.showErrorMessage(error.error)
          }
        )
      }
    });
  }

}
