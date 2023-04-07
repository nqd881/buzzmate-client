import Link from "next/link";
import React from "react";
import {AppbarIcon, AppbarIconProps} from "./AppbarIcon";

export type AppbarLinkIconProps = AppbarIconProps & {
  href: string;
};

export const AppbarLinkIcon: React.FC<AppbarLinkIconProps> = (props) => {
  return (
    <AppbarIcon
      {...props}
      wrapIcon={(icon) => <Link href={props.href}>{icon}</Link>}
    />
  );
};
