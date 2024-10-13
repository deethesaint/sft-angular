import { AbstractControl, ValidationErrors } from '@angular/forms';
import { userNameRegex } from '../../data-access/const/user-name-regex.const';

export function validateUsername(
  usernameControl: AbstractControl
): ValidationErrors | null {
  const value = usernameControl.value;
  const userName = new RegExp(userNameRegex);
  if (value && !userName.test(value)) {
    return {
      userNamePattern: true,
    };
  }
  return null;
}
