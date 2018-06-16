import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {

    public static strong(control: FormControl): ValidationResult {
        // const hasNumber = /\d/.test(control.value);
        // const hasUpper = /[A-Z]/.test(control.value);
        // const hasLower = /[a-z]/.test(control.value);
        // const regex = /[$-/:-?{-~!"^_`\[\]]/g; // "
        const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}/g;
        const hasAllRequirements = regex.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = hasAllRequirements;
        if (!valid) {
            // return what´s not valid
            return { strong: true };
        }
        return null;
    }
}