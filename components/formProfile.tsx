import React, { useState } from "react"
import { Box, Button, Flex, Heading } from "rebass"
import { Label, Input } from "@rebass/forms"
import { updateUserById } from "../utils/auth0"
import { InputMessage } from "./inputMessage"
import { validateEmail, validateNickname, Error } from "../utils/formValidation"

type Profile = {
  nickname: string,
  email: string
}

type ProfileErrors = {
  nickname?: Error,
  email?: Error,
}

export type Props = {
  user: Record<string, any>,
  token: string,
}

export const dataTestIds = {
  container: "form-profile-container",
  nameField: "form-profile-name-input",
  emailField: "form-profile-email-input",
  nameFieldMessage: "form-profile-name-message",
  emailFieldMessage: "form-profile-email-message",
  submitButton: "form-profile-submit-button",
}

export const FormProfile: React.FC<Props> = ({ user, token }) => {
  const [userData, setUserData] = useState({
    email: user.email,
    nickname: user.nickname
  } as Profile)
  const [validation, setValidation] = useState({} as ProfileErrors)

  const updateProfile = async (): Promise<Response> => {
    return updateUserById(token, user.user_id, userData)
  }

  const validateAndSetProfileData = ({ email, nickname }: {email?: string, nickname?: string}): void => {
    setUserData({ email, nickname })
    setValidation({
      email: email ? validateEmail(email) : validation.email,
      nickname: nickname ? validateNickname(nickname) : validation.nickname,
    })
  }

  return (
    <Box
      data-testid={dataTestIds.container}
      as='form'
      onSubmit={(e): void => e.preventDefault()}
      mb={4}
    >
      <Heading pb={2}>Update your profile</Heading>
      <Label htmlFor='name'>Name</Label>
      <Flex>
        <Input
          data-testid={dataTestIds.nameField}
          width={1 / 2}
          mb={2}
          id='name'
          name='name'
          defaultValue={userData.nickname}
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
            validateAndSetProfileData({
              nickname: e.currentTarget.value
            })
          }}
        />
        <InputMessage data-testid={dataTestIds.nameFieldMessage} {...validation.nickname} />
      </Flex>
      <Label htmlFor='name'>Email address</Label>
      <Flex>
        <Input
          data-testid={dataTestIds.emailField}
          width={1 / 2}
          mb={2}
          id='email'
          name='email'
          defaultValue={userData.email}
          type="email"
          onChange={(e: React.FormEvent<HTMLInputElement>): void => {
          validateAndSetProfileData({
            email: e.currentTarget.value
          })
        }}
        />
        <InputMessage data-testid={dataTestIds.emailFieldMessage}  {...validation.email} />
      </Flex>
      <Button data-testid={dataTestIds.submitButton} variant="secondary" onClick={(): void => { updateProfile() }}>Update profile</Button>
    </Box>)
}
