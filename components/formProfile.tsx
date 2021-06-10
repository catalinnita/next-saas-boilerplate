import React, { useState } from "react"
import { Box, Button, Flex, Heading, Text } from "rebass"
import { Label, Input } from "@rebass/forms"
import { InputMessage } from "./inputMessage"
import { validateEmail, validateNickname, Error } from "../utils/formValidation"
import Loader from "react-loader-spinner";

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
  setUser: (userData: Record<string, any>) => void
}

export const dataTestIds = {
  container: "form-profile-container",
  nameField: "form-profile-name-input",
  emailField: "form-profile-email-input",
  nameFieldMessage: "form-profile-name-message",
  emailFieldMessage: "form-profile-email-message",
  submitButton: "form-profile-submit-button",
}

export const FormProfile: React.FC<Props> = ({ user, setUser }) => {
  const [userData, setUserData] = useState({
    email: user.email,
    nickname: user.nickname
  } as Profile)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [validation, setValidation] = useState({} as ProfileErrors)

  // const updateProfile = async (): void => {
  //   // return updateUserById(token, user.user_id, userData)
  //   setLoading(true)
  //   const updated = await setUser(userData)
  //   if (updated.error && updated.message) {
  //     setErrorMessage(updated.message)
  //   }
  //   setLoading(false)
  //   setSuccessMessage("Succesfully updated")
  // }

  const updateProfile = async (): void => {
    setUser(userData)
  }

  const validateAndSetProfileData = ({ email, nickname }: {email?: string, nickname?: string}): void => {
    setUserData({
      email: email || userData.email,
      nickname: nickname || userData.nickname
    })
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
          }}><Heading as="h3" fontSize="18px">Update your profile</Heading></Flex>

        <Box variant="rowStyle"><Label htmlFor='name'>Name</Label></Box>
        <Flex variant="rowStyle" flexDirection="row">
          <Input
            data-testid={dataTestIds.nameField}
            width={2 / 3}
            id='name'
            name='name'
            defaultValue={userData.nickname}
            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
              validateAndSetProfileData({
                nickname: e.currentTarget.value
              })
            }}
          />
          <Box width={1/3}>
            <InputMessage data-testid={dataTestIds.nameFieldMessage} {...validation.nickname} />
          </Box>
        </Flex>

        <Box variant="rowStyle"><Label htmlFor='name'>Email address</Label></Box>
        <Flex variant="rowStyle" flexDirection="row">
          <Input
            data-testid={dataTestIds.emailField}
            width={2 / 3}
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
          <Box width={1/3}>
            <InputMessage data-testid={dataTestIds.emailFieldMessage}  {...validation.email} />
          </Box>
        </Flex>

        <Box variant="rowStyle"></Box>
        <Box variant="rowStyle">
          <Box>
          {errorMessage && <Text variant="error" mb="8px">{errorMessage}</Text>}
          {successMessage && <Text variant="success" mb="8px">{successMessage}</Text>}
          <Button display="flex" data-testid={dataTestIds.submitButton} variant="small" onClick={(): void => { updateProfile() }}>
            Update profile
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
