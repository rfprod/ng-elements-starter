import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Signup form interface.
 */
export interface ISignupForm extends FormGroup {
  controls: {
    name: AbstractControl;
    email: AbstractControl;
    organization: AbstractControl;
    password: AbstractControl;
  };
}
