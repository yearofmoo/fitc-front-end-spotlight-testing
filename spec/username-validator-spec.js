describe("UsernameValidator", function() {

  function stub(method, value) {
    var backup = window[method];
    window[method] = function() {
      return value;
    };
    return function() {
      window[method] = backup;
    }
  }

  var validators = {};
  beforeEach(function() {
    validators.numeric = stub('numericValidator', true);
    validators.lower   = stub('lowerCaseValidator', true);
    validators.upper   = stub('upperCaseValidator', true);
    validators.special = stub('specialCharactersValidator', true);
    validators.noSpace = stub('nonSpaceValidator', true);
  });

  afterEach(function() {
    for(var i in validators) {
      validators[i]();
    }
  });

  it("should require digits", function() {
    validators.numeric();
    expect(usernameValidatorRefactored("username")).toBeFalsy();
    expect(usernameValidatorRefactored("us3rname")).toBeTruthy();
    expect(usernameValidatorRefactored("us3rnam3")).toBeTruthy();
  });

  it("should require lowercase letters", function() {
    validators.lower();
    expect(usernameValidatorRefactored("USERNAME")).toBeFalsy();
    expect(usernameValidatorRefactored("USERnAME")).toBeTruthy();
    expect(usernameValidatorRefactored("uSERnAME")).toBeTruthy();
  });

  it("should require uppercase letters", function() {
    validators.upper();
    expect(usernameValidatorRefactored("username")).toBeFalsy();
    expect(usernameValidatorRefactored("usernamE")).toBeTruthy();
    expect(usernameValidatorRefactored("UsernamE")).toBeTruthy();
  });

  it("should require special letters", function() {
    validators.special();
    expect(usernameValidatorRefactored("username")).toBeFalsy();
    expect(usernameValidatorRefactored("usern&me")).toBeTruthy();
    expect(usernameValidatorRefactored("u$ern&me")).toBeTruthy();
  });

  it("should not allow any spaces", function() {
    validators.noSpace();
    expect(usernameValidatorRefactored("user name")).toBeFalsy();
    expect(usernameValidatorRefactored("username")).toBeTruthy();
    expect(usernameValidatorRefactored("username")).toBeTruthy();
  });
});

