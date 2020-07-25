import React from "react"
import { FiSearch } from "react-icons/fi"
import { InputProps } from "@chakra-ui/core"
import Input from "../elements/Input"

interface NavSearchProps {
  value: string
  setValue: (value: string) => void
}

const NavSearch: React.FC<NavSearchProps & InputProps> = ({
  value,
  setValue,
  ...props
}) => {
  return (
    <Input
      value={value}
      setValue={setValue}
      iconRight={FiSearch}
      variant="filled"
      _focus={{}}
      {...props}
    />
  )
}

export default NavSearch
