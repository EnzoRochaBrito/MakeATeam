import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-member-modal',
  imports: [FormsModule],
  templateUrl: './edit-member-modal.component.html',
  styleUrl: './edit-member-modal.component.css'
})
export class EditMemberModalComponent {

  @Input() user!: string;
  @Input() tag!: string;

  constructor(public activeModal: NgbActiveModal){}
}
