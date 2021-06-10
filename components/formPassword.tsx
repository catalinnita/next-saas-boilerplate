import React, { useState } from "react"
import { Box, Button, Flex, Heading, Text } from "rebass"
import { Label, Input } from "@rebass/forms"
import { updateUserById } from "../utils/auth0"
import { InputMessage } from "./inputMessage"
import { validatePassword, verifyPasswords, Error } from "../utils/formValidation"
import Loader from "react-loader-spinner";

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
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const updatePassword = async (): void => {
    setLoading(true)
    const updated = await setUser({ password: passwordData.password1 })
    if (updated.error && updated.message) {
      setErrorMessage(updated.message)
    }
    setLoading(false)
    setSuccessMessage("Succesfully updated")
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
    >

      <Box
        variant="tableStyle"
        sx={{
          gridTemplateColumns: "30% 70%",
        }}
      >
        <Flex justifyContent="space-between" alignItems="center"
          backgroundColor="white"
          p="12px 16px"
          sx={{
            gridColumnStart: 1,
            gridColumnEnd: 3
          }}><Heading as="h3" fontSize="18px">Update your password</Heading></Flex>

        <Box variant="rowStyle"><Label htmlFor='name'>New password</Label></Box>
        <Flex variant="rowStyle" flexDirection="row">
          <Input
            data-testid={dataTestIds.password1Field}
            width={2 / 3}
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
            <Box width={1/3}>
              <InputMessage data-testid={dataTestIds.password1FieldMessage} {...validation.password1} />
              </Box>
        </Flex>

        <Box variant="rowStyle"><Label htmlFor='name'>Verify new password</Label></Box>
        <Flex variant="rowStyle" flexDirection="row">
          <Input
            data-testid={dataTestIds.password2Field}
            width={2 / 3}
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
            <Box width={1/3}>
              <InputMessage data-testid={dataTestIds.password2FieldMessage} {...validation.password2} />
              </Box>
          </Flex>

        <Box variant="rowStyle"></Box>
        <Box variant="rowStyle">
          <Box>
          {errorMessage && <Text variant="error" mb="8px">{errorMessage}</Text>}
          {successMessage && <Text variant="success" mb="8px">{successMessage}</Text>}
          <Button display="flex" data-testid={dataTestIds.submitButton} variant="small" onClick={(): void => { updatePassword() }}>
            Update password
            {loading &&
              <Loader
                type="ThreeDots"
                height={12}
                width={18}
                color="#0984e3"
                style={{marginLeft: "4px", marginBottom: "-4px"}}
                />}
            </Button>
            </Box>
        </Box>
      </Box>

    </Box>)
}
