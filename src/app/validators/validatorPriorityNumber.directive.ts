import {AbstractControl, ValidatorFn} from '@angular/forms';

/**
 * Función que valida que el valor de la puntuación dada a un interés se encuentre entre 0 y 10.
 */
export function validadorPriorityNumberOfInterest(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return (control.value >= 0 && control.value <= 10) ? null : { rangePriorityWrong: true };
  };
}
