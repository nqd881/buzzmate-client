import {
  Button,
  ComponentWithAs,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import React, {useState} from "react";

export type ChakraInputProps = ComponentWithAs<"input", InputProps> extends (
  props: infer X
) => any
  ? X
  : never;

export const CustomInput: React.FC<ChakraInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = props?.type === "password";

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownShowPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <InputGroup>
      <Input
        pr={isPasswordField ? "4.5rem" : "auto"}
        {...props}
        type={isPasswordField && showPassword ? "text" : props?.type || "text"}
      />
      {isPasswordField && (
        <InputRightElement height='100%' width='4.5rem' mr={1}>
          <Button
            h='1.75rem'
            size='sm'
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownShowPassword}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
