import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private modalService: NgbModal
  ) { }

  showSuccessMessage(message: string){
    
  }
}
