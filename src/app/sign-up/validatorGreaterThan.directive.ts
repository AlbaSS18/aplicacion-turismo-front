import {AbstractControl, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

export function validadorAgeGreaterThan(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return control.value >= 18 ? null : { menorDeEdad: true };
  };
}
