import { ExcelService } from './../../services/excel/excel.service';
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
import { PropertyFiltersComponent } from 'src/app/components/property-filters/property-filters.component';

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
  currentPage = 1;
  totalPages = 1;
  search = new FormControl()
  routeSubsctiption: Subscription = new Subscription;

  constructor(
    private propertyService: PropertyService,
    private modalService: NgbModal,
    private messageModalService: MessageModalService,
    private route: ActivatedRoute,
    private router: Router,
    private excelService: ExcelService
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
    if(!this.loadingProperties){
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          search: this.search.value
        },
        queryParamsHandling: 'merge',
        skipLocationChange: false
      });
    }
  }

  showPropertyFiltersForm(){
    const modalRef = this.modalService.open(PropertyFiltersComponent, { size: 'md', scrollable: true, centered: true })
    modalRef.result.then((result) => {
      if (result == "refresh") {
        this.getPropertySet();
      }
    });
  }

  clearFilters(){
    this.search.setValue(null);
    this.router.navigate([]);
  }

  downloadExcel() {

    this.loadingProperties = true;
    let properties: Property[] = [];
    let tempProperties = this.properties;
    this.properties = [];

    this.propertySubscription = this.propertyService.getPropertySetForExcel().subscribe(
      (response: PropertySet) => {

        properties = response.properties;

        let headers = [
          "Id",
          "Name",
          "Owner",
          "Tags",
          "Price",
          "LOI",
          "Date Added",
          "Date Updated",
          "Last Editor",
        ]

        let formattedPropertyData: any = []

        properties.forEach(property => {

          let formattedProperty = {
            id: property.propertyId,
            name: property.name,
            owner: property.owner,
            tags: property.tags,
            price: property.price,
            dateLoi: property.dateLoi,
            dateAdded: property.dateAdded,
            dateUpdated: property.dateUpdated,
            lastEditor: '',
          }

          if (property.lastEditor){
            formattedProperty.lastEditor = property.lastEditor.firstName + " " + property.lastEditor.lastName
          }

          formattedPropertyData.push(formattedProperty);
        });

        this.excelService.exportAsExcelFile(formattedPropertyData, headers, "Properties");
        this.loadingProperties = false;
        this.properties = tempProperties;
      },
      (error) => {
        console.log(error)
        this.messageModalService.showErrorMessage(error.error)
        this.loadingProperties = false;
        this.properties = tempProperties;
      }
    )
  }

  handlePaging(increment: number){
    this.currentPage += increment;
    if (this.currentPage > 0){
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          page: this.currentPage
        },
        queryParamsHandling: 'merge',
        skipLocationChange: false
      });
    }
  }

  getPropertySet(){
    this.properties = [];
    this.loadingProperties = true;
    this.propertySubscription = this.propertyService.getPropertySet().subscribe(
      (response: PropertySet) => {
        this.properties = response.properties;
        this.resultsFound = response.resultsFound;
        this.currentPage = response.currentPage;
        this.totalPages = response.totalPages;
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
