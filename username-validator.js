function numericValidator(input) {
  return /[0-9]+/.test(input);
}

function lowerCaseValidator(input) {
  return /[a-z]+/.test(input);
}

function upperCaseValidator(input) {
  return /[A-Z]+/.test(input);
}

function specialCharactersValidator(input) {
  return /\W+/.test(input);
}

function nonSpaceValidator(input) {
  return !/\s+/.test(input);
}

function usernameValidatorBig(input) {
  return /[0-9]+/.test(input) &&
         /[a-z]+/.test(input) &&
         /[A-Z]+/.test(input) &&
         /\W+/.test(input)    &&
         !/\s+/.test(input);
}

function usernameValidatorRefactored(input) {
  return numericValidator(input) &&
         lowerCaseValidator(input) &&
         upperCaseValidator(input) &&
         specialCharactersValidator(input) &&
         nonSpaceValidator(input);
}
