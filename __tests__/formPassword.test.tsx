import React from "react"
import { fireEvent, render } from "@testing-library/react"
import { FormPassword, Props, dataTestIds } from "../components/formPassword"
import { InputMessage }  from "../components/inputMessage"
import { validatePassword, verifyPasswords } from "../utils/formValidation"
import { updateUserById } from "../utils/auth0"

const props: Props = {
  user: {
    email: "joe@test.com",
    nickname: "Joe"
  },
  token: "tokenstring"
}
it("should render FormPassword component", async () => {
  const { getByTestId } = render(<FormPassword {...props} />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("should render the Passowrd1 field", async () => {
  const { getByTestId } = render(<FormPassword {...props} />)
  expect(getByTestId(dataTestIds.password1Field)).toBeInTheDocument()
})

it("should render the Passowrd2 field", async () => {
  const { getByTestId } = render(<FormPassword {...props} />)
  expect(getByTestId(dataTestIds.password2Field)).toBeInTheDocument()
})

jest.mock("../components/inputMessage", () => {
  return {
    InputMessage: jest.fn(() => null),
  };
});

jest.mock("../utils/formValidation", () => {
  return {
    validatePassword: jest.fn(() => null),
    verifyPasswords: jest.fn(() => null),
  };
});


it("should validate the Password1 field when the password is changed", async () => {
  const { getByTestId } = render(<FormPassword {...props} />)
  const password1Field = getByTestId(dataTestIds.password1Field)
  fireEvent.change(password1Field, { target: { value: "Test123" } })

  expect(validatePassword).toHaveBeenCalledWith("Test123")
  expect(InputMessage).toHaveBeenCalled()
})


it("should verify the first password and seconda password when the Password2 is changed", async () => {
  const { getByTestId } = render(<FormPassword {...props} />)
  const password1Field = getByTestId(dataTestIds.password1Field)
  const password2Field = getByTestId(dataTestIds.password2Field)
  fireEvent.change(password1Field, { target: { value: "Test123" } })
  fireEvent.change(password2Field, { target: { value: "Test12" } })

  expect(verifyPasswords).toHaveBeenCalledWith("Test123", "Test12")
  expect(InputMessage).toHaveBeenCalled()
})

jest.mock("../utils/auth0", () => {
  return {
    updateUserById: jest.fn(() => null),
  };
});

// it("calls updateUserById when form is submit", async () => {
//   const { getByTestId } = render(<FormPassword {...props} />)
//   const formButton = getByTestId(dataTestIds.submitButton)

//   fireEvent.click(formButton)
//   expect(updateUserById).toHaveBeenCalled()
// })
