import { PropertySet } from './../../interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PropertyDetailsComponent } from 'src/app/components/property-details/property-details.component';
import { PropertyFormComponent } from 'src/app/components/property-form/property-form.component';
import { Property } from 'src/app/interfaces';
import { MessageModalService } from 'src/app/services/message-modal/message-modal.service';
import { PropertyService } from 'src/app/services/property/property.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit, OnDestroy {

  propertySubscription: Subscription = new Subscription;
  properties: Property[] = [];
  loadingProperties = false;
  resultsFound = 0;
  search = new FormControl()

  constructor(
    private propertyService: PropertyService,
    private modalService: NgbModal,
    private messageModalService: MessageModalService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.getPropertySet();
      }
    });
  }

  ngOnDestroy(): void {
    this.propertySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getPropertySet();
  }

  searchProperties(){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.search.value
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

  getPropertySet(){
    this.properties = [];
    this.loadingProperties = true;
    this.propertySubscription = this.propertyService.getPropertySet().subscribe(
      (response: PropertySet) => {
        this.properties = response.properties;
        this.resultsFound = response.resultsFound;
        this.loadingProperties = false;
      },
      (error) => {
        console.log(error)
        this.messageModalService.showErrorMessage(error.error)
        this.loadingProperties = false;
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
