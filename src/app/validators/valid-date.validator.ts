import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StartDateValidator {

  static notInPast(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDateValue = control.get('startDate')?.value;

      if (!startDateValue) {
        return null;
      }

      const selectedDate = new Date(startDateValue);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        control.get('startDate')?.setErrors({ pastDate: true });
        return { pastDate: true };
      }

      return null;
    };
  }

}