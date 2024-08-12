import regexPatterns from "./regex";

export function isValidPassword(
  password: string,
  passwordConfirm: string,
  regexPattern: RegExp = regexPatterns.securePassword
): string | null {
  if (!password || !passwordConfirm) {
    return "The password and password confirmation fields are both required";
  } else if (passwordConfirm !== password) {
    return "Passwords do not match";
  } else {
    if (!regexPattern.test(password)) {
      return "Password strength is not sufficent";
    } else return null;
  }
}
