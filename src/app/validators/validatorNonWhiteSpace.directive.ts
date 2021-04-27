import {AbstractControl, ValidatorFn} from '@angular/forms';

export function validadorNonwhiteSpace(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    console.log(control.value.trim().length === 0)
    return control.value.trim().length === 0 ? { hasWhiteSpace: true } : null;
  };
}

