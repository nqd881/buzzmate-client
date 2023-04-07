import {Text} from "@chakra-ui/react";
import {sassClasses} from "@utils";
import AuthLink from "./AuthLink";
import styles from "./Content.module.scss";

const cl = sassClasses(styles);

export interface AuthNotificationProps {
  message: string;
}

export const AuthNotification: React.FC<AuthNotificationProps> = ({
  message,
}) => {
  return (
    <div className={cl("root")}>
      <Text fontSize='xl' m={2}>
        {message}
      </Text>
      <AuthLink href='/auth/signin' content='Go to signin page' />
    </div>
  );
};
