import {default as NextLink, LinkProps} from "next/link";
import {Link} from "@chakra-ui/react";

type AuthLinkProps = {
  href: string;
  content: string;
};

const AuthLink: React.FC<AuthLinkProps> = (props) => {
  return (
    <Link as={NextLink} href={props.href as string} m={3}>
      {props.content}
    </Link>
  );
};

export default AuthLink;
