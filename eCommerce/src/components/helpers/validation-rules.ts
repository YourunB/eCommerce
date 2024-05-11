export type Validation = {
  readonly subject: string; // subject of validation
  validate: boolean; // success or not
  errors: string[]; // accumulate errors here
};

type Rule = {
  (target: Validation): Validation;
};

// common rules
export const isNotEmpty: Rule = (target) => {
  const result = { ...target };
  if (result.subject.length === 0) {
    result.errors.push('must not be empty');
    result.validate = false;
    return result;
  }
  return result;
};

export const isNotContainWhitespaces: Rule = (target) => {
  const result = { ...target };
  if (result.subject.trim().length !== result.subject.length) {
    result.errors.push('Email address must not contain leading or trailing whitespace');
    result.validate = false;
    return result;
  }
  return result;
};

export const isToLong33: Rule = (target) => {
  const result = { ...target };
  if (result.subject.length > 33) {
    result.errors.push('should be less than 33 characters long');
    result.validate = false;
    return result;
  }
  return result;
};

// password rules
export const isPassLeast8: Rule = (target) => {
  const result = { ...target };
  if (result.subject.trim().length < 8) {
    result.errors.push('Password must be at least 8 characters long');
    result.validate = false;
    return result;
  }
  return result;
};

export const isPassContainUppercase: Rule = (target) => {
  const result = { ...target };
  const regexp = /[A-Z]+/g;
  if (!result.subject.match(regexp)) {
    result.errors.push('Password must contain at least one uppercase letter (A-Z)');
    result.validate = false;
    return result;
  }
  return result;
};

export const isPassContainLowercase: Rule = (target) => {
  const result = { ...target };
  const regexp = /[a-z]+/g;
  if (!result.subject.match(regexp)) {
    result.errors.push('Password must contain at least one lowercase letter (a-z)');
    result.validate = false;
    return result;
  }
  return result;
};

export const isPassContainNumber: Rule = (target) => {
  const result = { ...target };
  const regexp = /[0-9]+/gi;
  if (!result.subject.match(regexp)) {
    result.errors.push('Password must contain at least one digit (0-9)');
    result.validate = false;
    return result;
  }
  return result;
};

// email rules
export const isEmailProperlyFormatted: Rule = (target) => {
  const result = { ...target };
  const regexp = /\w+@\w+\.\w+/gi;
  if (!result.subject.match(regexp)) {
    result.errors.push('Email address must be properly formatted (e.g., user@example.com)');
    result.validate = false;
    return result;
  }
  return result;
};

export const isEmailContainDomainName: Rule = (target) => {
  const result = { ...target };
  const regexp = /\w+\.\w+/gi;
  if (!result.subject.match(regexp)) {
    result.errors.push('Email address must contain a domain name (e.g., example.com)');
    result.validate = false;
    return result;
  }
  return result;
};

export const isEmailContainDog: Rule = (target) => {
  const result = { ...target };
  const regexp = /\w+@\w+/gi;
  if (!result.subject.match(regexp)) {
    result.errors.push('Email address must contain an `@` symbol separating local part and domain name');
    result.validate = false;
    return result;
  }
  return result;
};

//first and last name rules

export const isNotContainSpecialCharactersAndNumbers: Rule = (target) => {
  const result = { ...target };
  const regexp = /([0-9]|&[a-z]+;|<|>|"|'|`|~|!|@|#|\$|%|\^|&|\*|\(|\)|-|_|\+|=|\||\\|{|}|\[|\]|:|;|,|\.|<|>|\?|\/)/;
  if (result.subject.match(regexp)) {
    result.errors.push('Must not contain special characters or numbers');
    result.validate = false;
    return result;
  }
  return result;
};

//date of birth rules

export const isEnoughOlder: Rule = (target) => {
  const result = { ...target };
  const birthDate = new Date(result.subject);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  if (age < 13) {
    result.errors.push('User should be at least 13 years old');
    result.validate = false;
    return result;
  }
  return result;
};

//postal code rules

export const isRightPostalCode: Rule = (target) => {
  const result = { ...target };
  const regexp = /^[\d]{5}$/;
  if (!result.subject.match(regexp)) {
    result.errors.push('Postal code must follow the format for the country (e.g., 12345)');
    result.validate = false;
    return result;
  }
  return result;
};

export function compose(...fns: Rule[]) {
  return (arg: Validation) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
