import {
  isToLong33,
  isNotEmpty,
  isPassLeast8,
  isEnoughOlder,
  isRightPostalCode,
  isEmailContainDog,
  isPassContainNumber,
  isPassContainLowercase,
  isPassContainUppercase,
  isNotContainWhitespaces,
  isEmailContainDomainName,
  isEmailProperlyFormatted,
  isContainAtLeastOneLetters,
} from '../validation-rules';

describe('validation-rules: isNotEmpty (must not be empty)', () => {
  const testData = [
    { data: { subject: 'ddd', validate: true, errors: [] }, expected: true },
    { data: { subject: '', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isNotEmpty(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isNotContainWhitespaces (must not contain leading or trailing whitespace)', () => {
  const testData = [
    { data: { subject: 'ddd', validate: true, errors: [] }, expected: true },
    { data: { subject: 'dd dd', validate: true, errors: [] }, expected: true },
    { data: { subject: ' ddd ', validate: true, errors: [] }, expected: false },
    { data: { subject: 'ddd ', validate: true, errors: [] }, expected: false },
    { data: { subject: '  ddd', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isNotContainWhitespaces(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isToLong33 (should be less than 33 characters long)', () => {
  const testData = [
    { data: { subject: '12345', validate: true, errors: [] }, expected: true },
    { data: { subject: '1234567890_1234567890_1234567890_1234567890', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isToLong33(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isPassLeast8 (Password must be at least 8 characters long)', () => {
  const testData = [
    { data: { subject: '123456789', validate: true, errors: [] }, expected: true },
    { data: { subject: '12345', validate: true, errors: [] }, expected: false },
    { data: { subject: '', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isPassLeast8(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isPassContainUppercase (must contain at least one uppercase letter (A-Z))', () => {
  const testData = [
    { data: { subject: 'AaaaZ', validate: true, errors: [] }, expected: true },
    { data: { subject: 'aaaaazzZ', validate: true, errors: [] }, expected: true },
    { data: { subject: 'aaaaazz', validate: true, errors: [] }, expected: false },
    { data: { subject: '', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isPassContainUppercase(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isPassContainLowercase (must contain at least one lowercase letter (a-z))', () => {
  const testData = [
    { data: { subject: 'aZZZZZ', validate: true, errors: [] }, expected: true },
    { data: { subject: 'AAAAZZZZ', validate: true, errors: [] }, expected: false },
    { data: { subject: '', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isPassContainLowercase(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isPassContainNumber (must contain at least one digit (0-9))', () => {
  const testData = [
    { data: { subject: '9aZZZZZ', validate: true, errors: [] }, expected: true },
    { data: { subject: 'AAAAZZZZ', validate: true, errors: [] }, expected: false },
    { data: { subject: '', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isPassContainNumber(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isEmailProperlyFormatted (Email address must be properly formatted)', () => {
  const testData = [
    { data: { subject: 'user@example.com', validate: true, errors: [] }, expected: true },
    { data: { subject: '@badtest', validate: true, errors: [] }, expected: false },
    { data: { subject: 'abc@badtest', validate: true, errors: [] }, expected: false },
    { data: { subject: '@badtest.abc', validate: true, errors: [] }, expected: false },
    { data: { subject: '', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isEmailProperlyFormatted(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isEmailContainDomainName (Email address must contain a domain name (e.g., example.com))', () => {
  const testData = [
    { data: { subject: 'user@example.com', validate: true, errors: [] }, expected: true },
    { data: { subject: '@test.abc', validate: true, errors: [] }, expected: true },
    { data: { subject: 'test.it', validate: true, errors: [] }, expected: true },
    { data: { subject: '@best', validate: true, errors: [] }, expected: false },
    { data: { subject: 'badtest', validate: true, errors: [] }, expected: false },
    { data: { subject: '', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isEmailContainDomainName(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isEmailContainDog (Email address must contain an `@` symbol separating local part and domain name)', () => {
  const testData = [
    { data: { subject: 'user@example.com', validate: true, errors: [] }, expected: true },
    { data: { subject: 'test@test.abc', validate: true, errors: [] }, expected: true },
    { data: { subject: 'test@best', validate: true, errors: [] }, expected: true },
    { data: { subject: '@test.it', validate: true, errors: [] }, expected: false },
    { data: { subject: 'badtest@', validate: true, errors: [] }, expected: false },
    { data: { subject: '@', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isEmailContainDog(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isEnoughOlder (User should be at least 13 years old)', () => {
  let now = new Date();
  now.setFullYear(now.getFullYear() - 13, now.getMonth(), now.getDate() - 2);
  const [goodDate] = now.toISOString().split('T');

  now = new Date();
  now.setFullYear(now.getFullYear() - 13, now.getMonth(), now.getDate() + 2);
  const [badDate] = now.toISOString().split('T');
  const testData = [
    { data: { subject: goodDate, validate: true, errors: [] }, expected: true },
    { data: { subject: badDate, validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isEnoughOlder(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isRightPostalCode (Postal code must follow the format for the country (e.g., 12345))', () => {
  const testData = [
    { data: { subject: '12345', validate: true, errors: [] }, expected: true },
    { data: { subject: '1234567', validate: true, errors: [] }, expected: false },
    { data: { subject: '123', validate: true, errors: [] }, expected: false },
    { data: { subject: 'abc12', validate: true, errors: [] }, expected: false },
    { data: { subject: 'abcde', validate: true, errors: [] }, expected: false },
    { data: { subject: '', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isRightPostalCode(data)).toHaveProperty('validate', expected);
  });
});

describe('validation-rules: isContainAtLeastOneLetters (Must contain at least one character a-z or A-Z)', () => {
  const testData = [
    { data: { subject: 'a', validate: true, errors: [] }, expected: true },
    { data: { subject: 'Z', validate: true, errors: [] }, expected: true },
    { data: { subject: '123', validate: true, errors: [] }, expected: false },
    { data: { subject: 'abc12', validate: true, errors: [] }, expected: true },
    { data: { subject: 'abcde', validate: true, errors: [] }, expected: true },
    { data: { subject: '#$%', validate: true, errors: [] }, expected: false },
  ];

  test.each(testData)('"$data.subject" must return "$expected"', ({ data, expected }) => {
    expect(isContainAtLeastOneLetters(data)).toHaveProperty('validate', expected);
  });
});
