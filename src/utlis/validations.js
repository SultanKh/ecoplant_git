export function isNumber(input) {
    const numberRegex = /^\d+$/;
    return numberRegex.test(input);
  }


  export function validateName(name) {
    const namePattern = /^[a-zA-Z\s]{1,30}$/;
    return namePattern.test(name);
  }