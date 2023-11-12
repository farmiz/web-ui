class Validator {
  isRequired(value: any) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (typeof value === "number" && isNaN(value)) ||
      (value instanceof Date && isNaN(value.getTime()))
    );
  }

  minLength(value: any, length: number) {
    return value.length < length;
  }

  isEnum(value: any | any[], enumValues: any[]) {
    if (Array.isArray(value)) {
      // If value is an array, check if all values are present in enumValues
      return !value.every((val) => enumValues.includes(val));
    } else {
      // If value is a single value, check if it's present in enumValues
      return !enumValues.includes(value);
    }
  }

  minValue(value: number, min: number) {
    return value < min;
  }

  maxValue(value: number, max: number) {
    return value > max;
  }

  maxLength(value: any, length: number) {
    return value.length > length;
  }

  sameAs(value: any, otherValue: any) {
    return value !== otherValue;
  }

  isEmail(value: string) {
    // Add your email validation logic here
    return !/^\S+@\S+\.\S+$/.test(value);
  }

  isPassword(value: string) {
    // Minimum length
    const minLength = 8;

    // Check for at least one uppercase letter
    const hasUppercase = /[A-Z]/.test(value);

    // Check for at least one lowercase letter
    const hasLowercase = /[a-z]/.test(value);

    // Check for at least one digit
    const hasDigit = /\d/.test(value);

    // Check for at least one special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    // Check if the password meets all criteria
    const isComplex =
      value.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar;

    return !isComplex;
  }
}

export const validator = new Validator();
