import {AbstractControl, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

export function validadorAgeGreaterThan(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    var timeDiff = Math.abs(Date.now() - new Date(control.value).getTime());
    var age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    return age >= 18 ? null : { menorDeEdad: true };
  };
}
