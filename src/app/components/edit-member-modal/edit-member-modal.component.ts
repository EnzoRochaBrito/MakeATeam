import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-member-modal',
  imports: [],
  templateUrl: './edit-member-modal.component.html',
  styleUrl: './edit-member-modal.component.css'
})
export class EditMemberModalComponent {
  constructor(public activeModal: NgbActiveModal){}
}
