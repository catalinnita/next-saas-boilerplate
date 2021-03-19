import React, { useState } from "react"
import { Box, Button, Flex, Heading } from "rebass"
import { Label, Input } from "@rebass/forms"
import { updateUserById } from "../utils/auth0"
import { InputMessage } from "./inputMessage"
import { validatePassword, verifyPasswords, Error } from "../utils/formValidation"

type Passwords = {
  password1: string,
  password2: string
}

type PasswordsErrors = {
  password1?: Error,
  password2?: Error,
}

export const dataTestIds = {
  container: "form-password-container",
  password1Field: "form-password-password1-input",
  password2Field: "form-password-password2-input",
  password1FieldMessage: "form-password-password1-message",
  password2FieldMessage: "form-password-password2-message",
  submitButton: "form-password-submit-button",
}

export type Props = {
  user: Record<string, any>,
  token: string,
  setUser?: (userData: Record<string, any>) => void,
}

export const FormPassword: React.FC<Props> = ({user, setUser}) => {
  const [passwordData, setPasswordData] = useState({} as Passwords)
  const [validation, setValidation] = useState({} as PasswordsErrors)

  const updatePassword = (): void => {
    setUser({ password: passwordData.password1 })
  }

  const validateAndSetPasswordData = ({ password1, password2 }): void => {
    setPasswordData({ password1, password2 })
    setValidation({
      password1: validatePassword(password1),
      password2: verifyPasswords(password1, password2)
    })
  }

  return (
    <Box
      data-testid={dataTestIds.container}
      as='form'
      onSubmit={(e): void => e.preventDefault()}
      mb={4}
    >
      <Heading pb={2}>Update your password</Heading>

      <Label htmlFor='name'>New password</Label>
      <Flex>
        <Input
          data-testid={dataTestIds.password1Field}
          width={1 / 2}
          mb={2}
          id='name'
          name='new-password'
          type="password"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            validateAndSetPasswordData({
              ...passwordData,
              password1: e.currentTarget.value
            })
          }}
          />
        <InputMessage data-testid={dataTestIds.password1FieldMessage} {...validation.password1} />
      </Flex>

      <Label htmlFor='name'>Verify new password</Label>
      <Flex width="100%">
        <Input
          data-testid={dataTestIds.password2Field}
          width={1 / 2}
          mb={2}
          id='name'
          name='new-password-v1'
          type="password"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            validateAndSetPasswordData({
              ...passwordData,
              password2: e.currentTarget.value
            })
          }}
        />
        <InputMessage data-testid={dataTestIds.password2FieldMessage} {...validation.password2} />
        </Flex>

      <Button data-testid={dataTestIds.submitButton} variant="secondary" onClick={():void => { updatePassword() }}>Update password</Button>
    </Box>)
}
