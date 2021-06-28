import React, { FormEvent } from "react"
import { Box, Flex } from "rebass"

type Props = {
  gridTemplateColumns: number[]
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
  as?: any,
  onSubmit?: (e: FormEvent) => void
}

export const dataTestIds = {
  container: "block-container",
  header: "header",
}

export const Block: React.FC<Props> = ({
  gridTemplateColumns,
  headerLeft,
  headerRight,
  children,
  ...rest
}) => {
  return (
    <Box
      data-testid={dataTestIds.container}
      variant="block"
      sx={{
        gridTemplateColumns: `${gridTemplateColumns.join("% ")}%`,
      }}
      {...rest}
    >
      {(headerLeft || headerRight) && <Flex
        data-testid={dataTestIds.header}
        variant="blockHeader"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          gridColumnStart: 1,
          gridColumnEnd: gridTemplateColumns.length + 1
        }}>
        {headerLeft}
        {headerRight}
      </Flex>}
      { children}
    </Box>
  )
}
