import {Button, ButtonProps, ComponentWithAs} from "@chakra-ui/react";

type AuthSubmitButtonProps = ComponentWithAs<"button", ButtonProps> extends (
  props: infer X
) => any
  ? X
  : never;

export const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = (props) => {
  return (
    <Button
      type='submit'
      variant='solid'
      spinnerPlacement='end'
      w='80%'
      m={2}
      color='#00ADBB'
      {...props}
    />
  );
};
