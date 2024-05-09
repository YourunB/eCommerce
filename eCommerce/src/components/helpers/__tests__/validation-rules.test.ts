import {
  isEmailContainDog,
  isEmailContainDomainName,
  isEmailProperlyFormatted,
  isNotContainWhitespaces,
  isNotEmpty,
  isPassContainLowercase,
  isPassContainNumber,
  isPassContainUppercase,
  isPassLeast8,
  isToLong33,
} from '../validation-rules';

describe('validation-rules: isNotEmpty', () => {
  it('must not be empty', () => {
    const goodData = {
      subject: 'ddd',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: '',
      validate: true,
      errors: [],
    };

    expect(isNotEmpty(goodData).validate).toBeTruthy();
    expect(isNotEmpty(badData).validate).toBeFalsy();
  });
});

describe('validation-rules: isNotContainWhitespaces', () => {
  it('must not contain leading or trailing whitespace', () => {
    const goodData = {
      subject: 'ddd',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: ' ddd ',
      validate: true,
      errors: [],
    };

    expect(isNotContainWhitespaces(goodData).validate).toBeTruthy();
    expect(isNotContainWhitespaces(badData).validate).toBeFalsy();
  });
});

describe('validation-rules: isToLong33', () => {
  it('should be less than 33 characters long', () => {
    const goodData = {
      subject: '123',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: '1234567890_1234567890_1234567890_1234567890',
      validate: true,
      errors: [],
    };

    expect(isToLong33(goodData).validate).toBeTruthy();
    expect(isToLong33(badData).validate).toBeFalsy();
  });
});

describe('validation-rules: isPassLeast8', () => {
  it('must be at least 8 characters long', () => {
    const goodData = {
      subject: '123456789',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: '12345',
      validate: true,
      errors: [],
    };

    expect(isPassLeast8(goodData).validate).toBeTruthy();
    expect(isPassLeast8(badData).validate).toBeFalsy();
  });
});

describe('validation-rules: isPassContainUppercase', () => {
  it('must contain at least one uppercase letter (A-Z)', () => {
    const goodData = {
      subject: 'AaaaZ',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: 'aaaaazzz',
      validate: true,
      errors: [],
    };

    expect(isPassContainUppercase(goodData).validate).toBeTruthy();
    expect(isPassContainUppercase(badData).validate).toBeFalsy();
  });
});

describe('validation-rules: isPassContainLowercase', () => {
  it('must contain at least one lowercase letter (a-z)', () => {
    const goodData = {
      subject: 'aZZZZZ',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: 'AAAAZZZZ',
      validate: true,
      errors: [],
    };

    expect(isPassContainLowercase(goodData).validate).toBeTruthy();
    expect(isPassContainLowercase(badData).validate).toBeFalsy();
  });
});

describe('validation-rules: isPassContainNumber', () => {
  it('must contain at least one digit (0-9)', () => {
    const goodData = {
      subject: '9aZZZZZ',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: 'AAAAZZZZ',
      validate: true,
      errors: [],
    };

    expect(isPassContainNumber(goodData).validate).toBeTruthy();
    expect(isPassContainNumber(badData).validate).toBeFalsy();
  });
});

describe('validation-rules: isEmailProperlyFormatted', () => {
  it('Email address must be properly formatted (e.g., user@example.com)', () => {
    const goodData = {
      subject: 'user@example.com',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: '@badtest',
      validate: true,
      errors: [],
    };

    expect(isEmailProperlyFormatted(goodData).validate).toBeTruthy();
    expect(isEmailProperlyFormatted(badData).validate).toBeFalsy();
  });
});

describe('validation-rules: isEmailContainDomainName', () => {
  it('Email address must contain a domain name (e.g., example.com)', () => {
    const goodData = {
      subject: 'example.com',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: 'test@badtest',
      validate: true,
      errors: [],
    };

    expect(isEmailContainDomainName(goodData).validate).toBeTruthy();
    expect(isEmailContainDomainName(badData).validate).toBeFalsy();
  });
});

describe('validation-rules: isEmailContainDog', () => {
  it('Email address must contain an `@` symbol separating local part and domain name', () => {
    const goodData = {
      subject: 'test@example.com',
      validate: true,
      errors: [],
    };
    const badData = {
      subject: 'test.com',
      validate: true,
      errors: [],
    };

    expect(isEmailContainDog(goodData).validate).toBeTruthy();
    expect(isEmailContainDog(badData).validate).toBeFalsy();
  });
});
