import React from "react"
import Loader from "react-loader-spinner"
import { Box, Button, Flex, Heading, Text } from "rebass"
import { Label, Input } from "@rebass/forms"
import { useDispatch } from "react-redux"
import { InputMessage } from "./inputMessage"
import { Block } from "./block"
import { updateProfile, setProfile } from "../state/slices/user"
import { useStateSelector } from "../utils/useStateSelector"

export const dataTestIds = {
  container: "form-profile-container",
  nameField: "form-profile-name-input",
  emailField: "form-profile-email-input",
  nameFieldMessage: "form-profile-name-message",
  emailFieldMessage: "form-profile-email-message",
  submitButton: "form-profile-submit-button",
  errorMessage: "form-profile-error-message",
  successMessage: "form-profile-success-message",
  loader: "form-profile-loader-icon",
}

export const FormProfile: React.FC = () => {
  const dispatch = useDispatch()

  const { email, name: nickname, error, loading, validation, success } = useStateSelector("user")

  console.log({
    email,
    nickname,
  })

  return (
    <Block
      gridTemplateColumns={[30, 70]}
      headerLeft={<Heading as="h3">Update your profile</Heading>}
      as="form"
      onSubmit={(e): void => e.preventDefault()}
    >
      <Box variant="rowStyle">
        <Label htmlFor="name">Name</Label>
      </Box>
      <Flex variant="rowStyle" flexDirection="row">
        <Input
          data-testid={dataTestIds.nameField}
          width={2 / 3}
          id="name"
          name="name"
          defaultValue={nickname}
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            dispatch(
              setProfile({
                nickname: e.currentTarget.value,
              })
            )
          }}
        />
        <Box width={1 / 3}>
          <InputMessage data-testid={dataTestIds.nameFieldMessage} {...validation.nickname} />
        </Box>
      </Flex>

      <Box variant="rowStyle">
        <Label htmlFor="email">Email address</Label>
      </Box>
      <Flex variant="rowStyle" flexDirection="row">
        <Input
          data-testid={dataTestIds.emailField}
          width={2 / 3}
          id="email"
          name="email"
          defaultValue={email}
          type="email"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            dispatch(
              setProfile({
                email: e.currentTarget.value,
              })
            )
          }}
        />
        <Box width={1 / 3}>
          <InputMessage data-testid={dataTestIds.emailFieldMessage} {...validation.email} />
        </Box>
      </Flex>

      <Box variant="rowStyle" />
      <Box variant="rowStyle">
        <Box>
          {error.profile && (
            <Text data-testid={dataTestIds.errorMessage} variant="error" mb="8px">
              {error.profile}
            </Text>
          )}
          {success.profile && (
            <Text data-testid={dataTestIds.successMessage} variant="success" mb="8px">
              {success.profile}
            </Text>
          )}
          <Button
            display="flex"
            data-testid={dataTestIds.submitButton}
            variant="primarySmall"
            onClick={(): void => {
              dispatch(
                updateProfile({
                  email,
                  nickname,
                })
              )
            }}
          >
            Update profile
            {loading.profile && (
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
