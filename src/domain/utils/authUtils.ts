function checkEmailStrength(email: string): boolean {
  const emailReg = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
  return emailReg.test(email);
}

function checkPasswordStrength(password: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
}

export { checkEmailStrength, checkPasswordStrength };
