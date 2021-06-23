import {AbstractControl, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

/**
 * Función que valida que el campo password y repeatPassword sean igual.
 */
export function validadorPasswordSame(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const password = control.get("password");
    const confirmarPassword = control.get("repeatPassword");
    return password.value === confirmarPassword.value ? null : { noSonIguales: true };
  };
}
