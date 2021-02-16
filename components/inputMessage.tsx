import React from "react"
import { Box, Flex, Text} from "rebass"
import { MdError, MdCheckCircle } from "react-icons/md"

export type Error = {
  valid?: boolean,
  message?: string
}

export const dataTestIds = {
  container: "input-message-container",
  text: "input-message-text",
  errorIcon: "input-error-icon",
  successIcon: "input-success-icon",
  errorText: "input-error-text",
  successText: "input-success-text",
}

export const InputMessage: React.FC<Error> = ({
  valid, message
}) => {
  return (
    message ?
      <Flex data-testid={dataTestIds.container}>
        {valid ?
          <>
            <Box p={2} pr={0} variant="success">
              <MdCheckCircle data-testid={dataTestIds.successIcon} size="20" />
            </Box>
            <Text
              data-testid={dataTestIds.successText}
              variant="success"
              p={2}
              pl={1}
            >{message}</Text>
          </>
          :
          <>
            <Box p={2} pr={0} variant="error">
              <MdError data-testid={dataTestIds.errorIcon} size="20" />
            </Box>
            <Text
                data-testid={dataTestIds.errorText}
                variant="error"
                p={2}
                pl={1}
                >{message}</Text>
          </>

        }
      </Flex>
   : null)
}
