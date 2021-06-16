import React, { FormEvent } from "react"
import { Box, Flex } from "rebass"

type Props = {
  gridTemplateColumns: number[]
  headerLeft?: React.ReactNode
  headerRight?: React.ReactNode
  as?: any,
  onSubmit?: (e: FormEvent) => void
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
      variant="tableStyle"
      sx={{
        gridTemplateColumns: `${gridTemplateColumns.join("% ")}%`,
      }}
      {...rest}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        p="12px 16px"
        sx={{
          gridColumnStart: 1,
          gridColumnEnd: gridTemplateColumns.length + 1
        }}>
        { headerLeft }
        { headerRight }
      </Flex>
      { children}
    </Box>
  )
}
