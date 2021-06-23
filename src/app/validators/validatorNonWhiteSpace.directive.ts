import {AbstractControl, ValidatorFn} from '@angular/forms';

/**
 * Función que valida que los campos de un formulario no estén en blanco.
 */
export function validadorNonwhiteSpace(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return control.value?.trim().length === 0 ? { hasWhiteSpace: true } : null;
  };
}

