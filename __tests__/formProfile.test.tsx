import React from "react"
import { fireEvent, render } from "@testing-library/react"
import { FormProfile, Props, dataTestIds } from "../components/formProfile"
import { InputMessage }  from "../components/inputMessage"
import { validateNickname, validateEmail } from "../utils/formValidation"
import { updateUserById } from "../utils/auth0"

const props: Props = {
  user: {
    email: "joe@test.com",
    nickname: "Joe"
  },
  token: "tokenstring",
  setUser: jest.fn()
}
it("should render FormProfile component", async () => {
  const { getByTestId } = render(<FormProfile {...props} />)
  expect(getByTestId(dataTestIds.container)).toBeInTheDocument()
})

it("should render the Name field", async () => {
  const { getByTestId } = render(<FormProfile {...props} />)
  expect(getByTestId(dataTestIds.nameField)).toBeInTheDocument()
})

it("should render the Email field", async () => {
  const { getByTestId } = render(<FormProfile {...props} />)
  expect(getByTestId(dataTestIds.emailField)).toBeInTheDocument()
})

jest.mock("../components/inputMessage", () => {
  return {
    InputMessage: jest.fn(() => null),
  };
});

jest.mock("../utils/formValidation", () => {
  return {
    validateNickname: jest.fn(() => null),
    validateEmail: jest.fn(() => null),
  };
});


it("should validate the Name field when the name is changed", async () => {
  const { getByTestId } = render(<FormProfile {...props} />)
  const nameField = getByTestId(dataTestIds.nameField)
  fireEvent.change(nameField, { target: { value: "Joe Doe" } })

  expect(validateNickname).toHaveBeenCalledWith("Joe Doe")
  expect(InputMessage).toHaveBeenCalled()
})


it("should validate the Email field when the email is changed", async () => {
  const { getByTestId } = render(<FormProfile {...props} />)
  const emailField = getByTestId(dataTestIds.emailField)
  fireEvent.change(emailField, { target: { value: "joedoe@test.com" } })

  expect(validateEmail).toHaveBeenCalledWith("joedoe@test.com")
  expect(InputMessage).toHaveBeenCalled()
})

jest.mock("../utils/auth0", () => {
  return {
    updateUserById: jest.fn(() => null),
  };
});

// it("calls updateUserById when form is submit", async () => {
//   const { getByTestId } = render(<FormProfile {...props} />)
//   const formButton = getByTestId(dataTestIds.submitButton)

//   fireEvent.click(formButton)
//   expect(updateUserById).toHaveBeenCalled()
// })
