import { NgClass } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormControlName, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = 'text' | 'email' | 'password';

@Component({
  selector: 'custom-input',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.css',
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => CustomInputComponent),
  //     multi: true
  //   }
  // ]
})
export class CustomInputComponent {
  @Input() icon!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;
  @Input() inputType: InputTypes = 'text';

  onChange: any = () => {}
  onTouched: any = () => {}
  value: string = ''

}