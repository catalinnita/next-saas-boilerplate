import React from "react"
import { Box, Button, Flex, Heading, Text } from "rebass"
import { Label, Input } from "@rebass/forms"
import Loader from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { InputMessage } from "./inputMessage"
import { useStateSelector } from "../utils/useStateSelector"
import { Block } from "./block"
import { setPassword, updatePassword } from "../state/slices/user"

export const dataTestIds = {
  container: "form-password-container",
  password1Field: "form-password-password1-input",
  password2Field: "form-password-password2-input",
  password1FieldMessage: "form-password-password1-message",
  password2FieldMessage: "form-password-password2-message",
  submitButton: "form-password-submit-button",
  errorMessage: "form-password-error-message",
  successMessage: "form-password-success-message",
  loader: "form-password-loader-icon",
}

export const FormPassword: React.FC = () => {
  const dispatch = useDispatch()

  const { password, error, loading, validation, success } = useStateSelector("user")

  return (
    <Block
      gridTemplateColumns={[30, 70]}
      data-testid={dataTestIds.container}
      as="form"
      onSubmit={(e): void => e.preventDefault()}
      headerLeft={<Heading as="h3">Update your password</Heading>}
    >
      <Box variant="rowStyle">
        <Label htmlFor="new-password">New password</Label>
      </Box>
      <Flex variant="rowStyle" flexDirection="row">
        <Input
          data-testid={dataTestIds.password1Field}
          width={2 / 3}
          mb={2}
          id="new-password"
          name="new-password"
          type="password"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            dispatch(
              setPassword({
                password: e.currentTarget.value,
              })
            )
          }}
        />
        <Box width={1 / 3}>
          <InputMessage data-testid={dataTestIds.password1FieldMessage} {...validation.password} />
        </Box>
      </Flex>

      <Box variant="rowStyle">
        <Label htmlFor="new-password-v1">Verify new password</Label>
      </Box>
      <Flex variant="rowStyle" flexDirection="row">
        <Input
          data-testid={dataTestIds.password2Field}
          width={2 / 3}
          mb={2}
          id="new-password-v1"
          name="new-password-v1"
          type="password"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            dispatch(
              setPassword({
                password1: e.currentTarget.value,
              })
            )
          }}
        />
        <Box width={1 / 3}>
          <InputMessage data-testid={dataTestIds.password2FieldMessage} {...validation.password1} />
        </Box>
      </Flex>

      <Box variant="rowStyle" />
      <Box variant="rowStyle">
        <Box>
          {error.password && (
            <Text data-testid={dataTestIds.errorMessage} variant="error" mb="8px">
              {error.password}
            </Text>
          )}
          {success.password && (
            <Text data-testid={dataTestIds.successMessage} variant="success" mb="8px">
              {success.password}
            </Text>
          )}
          <Button
            display="flex"
            data-testid={dataTestIds.submitButton}
            variant="primarySmall"
            onClick={(): void => {
              dispatch(updatePassword({ password }))
            }}
          >
            Update password
            {loading.password && (
              <Box data-testid={dataTestIds.loader}>
                <Loader type="ThreeDots" height={12} width={18} color="#0984e3" />
              </Box>
            )}
          </Button>
        </Box>
      </Box>
    </Block>
  )
}
