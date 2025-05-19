import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RequiredExp {

  static requiredExp(expArr: string[]): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {
        console.log("val exparr: ",expArr)
        if (expArr.length > 0) {
            return null
        }

        control.get('experience')?.setErrors({ requiredExp: true })

        return { requiredExp: true }
    }
  }

}
