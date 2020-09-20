import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/core";
import React, { useContext } from "react";
import MyThemeContext from "../../frontend-react/src/themeContext";

interface ButtonProps {
  children: string | string[];
  onClick?: () => void;
  size?: "xs" | "sm" | "lg" | "md";
  icon?: ChakraButtonProps["leftIcon"];
  width?: string;
  color?: string;
  outlined?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps & ChakraButtonProps> = ({
  children,
  onClick,
  icon,
  size,
  disabled,
  loading,
  width,
  color,
  outlined = false,
  ...props
}) => {
  const { themeColor } = useContext(MyThemeContext);
  return (
    <ChakraButton
      variant={outlined ? "outline" : "solid"}
      colorScheme={color ?? themeColor}
      leftIcon={icon}
      onClick={onClick}
      size={size}
      isDisabled={disabled}
      isLoading={loading}
      width={width ?? undefined}
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button;
