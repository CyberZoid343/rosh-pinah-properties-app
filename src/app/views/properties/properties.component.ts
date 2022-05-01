import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PropertyDetailsComponent } from 'src/app/components/property-details/property-details.component';
import { PropertyFormComponent } from 'src/app/components/property-form/property-form.component';
import { Property } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { PropertyService } from 'src/app/services/property/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit, OnDestroy {

  propertySubscription: Subscription = new Subscription;
  properties: Property[] = [];
  searchIsVisible = false;

  constructor(
    private propertyService: PropertyService,
    private modalService: NgbModal,
    private messageModalService: MessageModalService
  ) { }

  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getPropertySet();
  }

  showSeach(){
    if (this.searchIsVisible){
      this.searchIsVisible = false;
    }
    else{
      this.searchIsVisible = true;
    }
  }

  getPropertySet(){
    this.propertySubscription = this.propertyService.getPropertySet().subscribe(
      (resposnse) => {
        this.properties = resposnse;
      },
      (error) => {
        console.log(error)
        this.messageModalService.showErrorMessage(error.error)
      }
    )
  }

  openPropertyFormModal(){
    const modalRef = this.modalService.open(PropertyFormComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getPropertySet();
      }
    });
  }

  openPropertyDetailsModal(selectedProperty: Property){
    const modalRef = this.modalService.open(PropertyDetailsComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.componentInstance.propertyId = selectedProperty.propertyId;
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getPropertySet();
      }
    });
  }

}
