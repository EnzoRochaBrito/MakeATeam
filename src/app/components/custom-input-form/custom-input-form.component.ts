import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTypes } from '../../utils/inputTypes';

@Component({
  selector: 'custom-input-form',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input-form.component.html',
  styleUrl: './custom-input-form.component.css'
})
export class CustomInputFormComponent {
  @Input() name!: string;
  @Input() type!: InputTypes;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
}
