import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EqualPasswordValidator {

  static equalPassword(control: AbstractControl): ValidationErrors | null {

    const pswd1 = control.get('passwordOne')?.value;
    const pswd2 = control.get('passwordTwo')?.value;

    if (pswd1 === pswd2) { return null }

    control.get('passwordTwo')?.setErrors({ equalPassword: true })

    return { equalPassword: true }

  }

}
