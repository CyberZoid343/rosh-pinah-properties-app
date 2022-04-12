import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent {

  @Input() title: string | undefined;
  @Input() message: string | undefined;
  @Input() action: string | undefined;
  @Input() themeClass: string | undefined;
  @Input() iconClass: string | undefined;

  constructor(
    public activeModal: NgbActiveModal,
  ) { }

  closeModal(result: string) {
    this.activeModal.close(result);
  }
}
