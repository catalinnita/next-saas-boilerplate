import { validatePassword, verifyPasswords, validateNickname, validateEmail } from "../utils/formValidation"

it("should invalidate the name if it has less than 3 letters", async () => {
  const name = "Jo"
  expect(validateNickname(name).valid).toBe(false)
})

it("should validate the name if it has more than 3 letters", async () => {
  const name = "Joe"
  expect(validateNickname(name).valid).toBe(true)
})

it("should invalidate the email if it has less than 6 letters", async () => {
  const email = "a@b.c"
  expect(validateEmail(email).valid).toBe(false)
})

it("should invalidate the email if it doesn't include an @ character", async () => {
  const email = "test.com"
  expect(validateEmail(email).valid).toBe(false)
})

it("should invalidate the email if it doesn't include a . character", async () => {
  const email = "test@test"
  expect(validateEmail(email).valid).toBe(false)
})

it("should validate the email if it's a valid email", async () => {
  const email = "test@test.com"
  expect(validateEmail(email).valid).toBe(true)
})

it("should invalidate the password if it's less than 6 characters", async () => {
  const password = "Pass1"
  expect(validatePassword(password).valid).toBe(false)
})

it("should invalidate the password if it doesn't include a number", async () => {
  const password = "Password"
  expect(validatePassword(password).valid).toBe(false)
})

it("should invalidate the password if it doesn't include a special character", async () => {
  const password = "Password123"
  expect(validatePassword(password).valid).toBe(false)
})

it("should validate the password if satisfiy all the conditions", async () => {
  const password = "Password123$"
  expect(validatePassword(password).valid).toBe(true)
})

it("should invalidate the password if it doesn't match with the first password", async () => {
  const password1 = "Password123$"
  const password2 = "Password123#"
  expect(verifyPasswords(password1, password2).valid).toBe(false)
})

it("should validate the password if it matches with the first password", async () => {
  const password1 = "Password123$"
  const password2 = "Password123$"
  expect(verifyPasswords(password1, password2).valid).toBe(true)
})

it("should return undefined if one of the passwords is missing", async () => {
  const password1 = ""
  const password2 = "Password123$"
  expect(verifyPasswords(password1, password2)).toBe(undefined)
})
