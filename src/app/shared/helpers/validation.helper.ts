
export class ValidationHelper {
  public static extractValidationMessageFromError(errors: ValidationError[] | string): string | null {
    if (typeof(errors) === 'string') {
      return errors;
    }
    const validationErrors: string[] = [];

    errors.forEach(e => Object.values(e.constraints).forEach(
      ve => validationErrors.push(ValidationHelper.capitalizeError(ve)))
    );

    return validationErrors.length > 0 ? validationErrors[0] : null;
  }

  private static capitalizeError(error: string): string {
    if (!error || error.length === 0) {
      return error;
    }
    const lastChar = error[error.length - 1];
    return error.charAt(0).toUpperCase() + error.slice(1) + (lastChar === '.' ? '' : '.');
  }
}

interface ValidationError {
  constraints: {
    [key: string]: string,
  };
}
