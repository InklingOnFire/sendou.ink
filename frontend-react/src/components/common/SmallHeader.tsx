import React, { useContext } from "react"
import { Box, BoxProps } from "@chakra-ui/core"
import MyThemeContext from "../../themeContext"

interface SmallHeaderProps {
  children: React.ReactNode
}

const SmallHeader: React.FC<SmallHeaderProps & BoxProps> = ({
  children,
  ...props
}) => {
  const { grayWithShade } = useContext(MyThemeContext)
  return (
    <Box
      textTransform="uppercase"
      fontSize="75%"
      fontWeight={500}
      color={grayWithShade}
      py="0.5rem"
      ml="0.4rem"
      {...props}
    >
      {children}
    </Box>
  )
}

export default SmallHeader
