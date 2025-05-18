import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RequiredTech {

  static requiredTech(techArr: string[]): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        if (techArr.length > 0) {
            return null
        }

        control.get('technologies')?.setErrors({ requiredTech: true })

        return { requiredTech: true }
    }
  }

}
