import {AbstractControl, ValidatorFn} from '@angular/forms';

export function validadorPriorityNumberOfInterest(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return (control.value >= 0 && control.value <= 10) ? null : { rangePriorityWrong: true };
  };
}
