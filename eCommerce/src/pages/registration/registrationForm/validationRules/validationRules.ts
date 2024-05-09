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
    result.errors.push('Must contain at least one character');
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
