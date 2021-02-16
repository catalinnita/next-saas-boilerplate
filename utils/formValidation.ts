export type Error = {
  valid: boolean,
  message: string
}

export const validateNickname = (nickname: string): Error => {
  if (nickname.length < 3) {
    return {
      valid: false,
      message: "Not long enough"
    }
  }

  return {
    valid: true,
    message: "Valid"
  }
}

export const validateEmail = (email: string): Error => {
  if (email.length < 6) {
    return {
      valid: false,
      message: "Not long enough"
    }
  }

  if (!email.includes("@")) {
    return {
      valid: false,
      message: "Your email needs a domain"
    }
  }

  if (!email.includes(".")) {
    return {
      valid: false,
      message: "Your email needs a domain extension"
    }
  }

  return {
    valid: true,
    message: "Valid"
  }
}


export const validatePassword = (password: string): Error => {
  if (password.length < 6) {
    return {
      valid: false,
      message: "Not long enough"
    }
  }

  if (!password.match(/\d+/g)) {
    return  {
      valid: false,
      message: "Please add at least one number"
    }
  }

  if (!password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/)) {
    return {
      valid: false,
      message: "Please add at least one special character"
    }
  }

  return {
    valid: true,
    message: "Strong"
  }
}

export const verifyPasswords = (password1: string, password2: string): Error => {
  if (password1 && password2 && password1 !== password2) {
    return {
      valid: false,
      message: "Passwords don't match"
    }
  }

  if (password1 && password2 && password1 === password2) {
    return {
      valid: true,
      message: "Checks"
    }
  }

  return undefined
}
