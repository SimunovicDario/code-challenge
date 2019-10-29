import { AbstractControl } from '@angular/forms';

export function ValidatePasswordDigit(control: AbstractControl) {

    const password: string = control.value;

    if ( !(/\d+/g.test(password)) ) {
        return { invalidPasswordDigit: true };
    }
    return null;
}
