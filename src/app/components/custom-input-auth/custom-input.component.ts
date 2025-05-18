import { NgClass } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTypes } from '../../utils/type/input.types';


@Component({
  selector: 'custom-auth-input',
  imports: [ReactiveFormsModule, NgClass, ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
})
export class CustomInputAuthComponent {
  @Input() icon!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() inputType: InputTypes = 'text';

  onChange: any = () => {}
  onTouched: any = () => {}
  value: string = ''

}