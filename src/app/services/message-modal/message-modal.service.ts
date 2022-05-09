import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessageComponent } from 'src/app/components/error-message/error-message.component';
import { SuccessMessageComponent } from 'src/app/components/success-message/success-message.component';

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {

  constructor(
    private modalService: NgbModal,
  ) { }

  showSuccessMessage(message: string){
    const modalRef = this.modalService.open(SuccessMessageComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.message = message;
  }

  showErrorMessage(message: string){
    const modalRef = this.modalService.open(ErrorMessageComponent, { size: 'sm', centered: true });
    modalRef.componentInstance.message = message;
  }
}
