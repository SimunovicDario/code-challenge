import { AbstractControl } from '@angular/forms';

export function ValidatePasswordLength(control: AbstractControl) {

    const password: string = control.value;

    if (password.length < 6) {
        return { invalidPasswordLength: true };
    }

    return null;
}
