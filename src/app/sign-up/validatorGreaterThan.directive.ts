import {AbstractControl, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

export function validadorAgeGreaterThan(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    console.log(control.value)
    return control.value >= 16 ? null : { menorDeEdad: true };
  };
}
