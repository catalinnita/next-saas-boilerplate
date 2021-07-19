import React, { FormEvent } from "react"
import { Box, Flex } from "rebass"

type Props = {
  header?: React.ReactNode
  controlsLeft?: React.ReactNode
  controlsRight?: React.ReactNode
  onSubmit?: (e: FormEvent) => void
}

export const dataTestIds = {
  container: "block-chart-container",
  header: "block-chart-header",
}

export const BlockChart: React.FC<Props> = ({
  header,
  controlsLeft,
  controlsRight,
  children,
  ...rest
}) => {
  return (
    <Box
      data-testid={dataTestIds.container}
      variant="block"
      bg="white"
      pb="12px"
      {...rest}
    >
      {header && <Flex
        data-testid={dataTestIds.header}
        variant="blockHeader"
        justifyContent="space-around"
        alignItems="center">
        {header}
      </Flex>}
      {(controlsLeft || controlsRight) &&
        <Flex
          justifyContent="space-between"
        p="16px 24px"
        sx={{
          borderTop: '1px solid #efefef',
          borderBottom: '1px solid #efefef'
        }}
        >
          {controlsLeft && <Flex
            data-testid={dataTestIds.header}
            variant="blockControls"
            justifyContent="space-around"
            alignItems="flex-start">
            {controlsLeft}
          </Flex>}
          {controlsRight && <Flex
            data-testid={dataTestIds.header}
            variant="blockControls"
            justifyContent="space-around"
            alignItems="flex-end">
            {controlsRight}
          </Flex>}
        </Flex>
      }
      { children}
    </Box>
  )
}
