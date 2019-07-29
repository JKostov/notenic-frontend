import { ValidationErrors } from '@angular/forms';

export class FormHelper {
  public static generateErrorMessagesFromErrors(name: string, validationErrors: ValidationErrors): string[] {
    const errors = [];

    if (!validationErrors) {
      return errors;
    }

    Object.keys(validationErrors).forEach(e => {
      switch (e) {
        case 'required': {
          errors.push(`${name} is required.`);
          break;
        }
        case 'minlength': {
          errors.push(`${name} must have minimum length of ${validationErrors[e].requiredLength}.`);
          break;
        }
        case 'maxlength': {
          errors.push(`${name} must have maximum length of ${validationErrors[e].requiredLength}.`);
          break;
        }
        case 'email': {
          errors.push(`${name} must be a valid email address.`);
          break;
        }
      }
    });

    return errors;
  }
}
