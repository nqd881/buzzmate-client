import {useRouter} from "next/router";
import React from "react";
import styles from "./Appbar.module.scss";
import {AppbarIconBox} from "./AppbarIconBox";
import {AppbarLinkIcon, AppbarLinkIconProps} from "./AppbarLinkIcon";
import {links} from "./links";

const AppbarLinkItem: React.FC<AppbarLinkIconProps> = (props) => {
  const router = useRouter();
  const active = props.href === router.pathname;

  return (
    <AppbarIconBox active={active}>
      <AppbarLinkIcon {...props} active={active} />
    </AppbarIconBox>
  );
};

export const Appbar = () => {
  return (
    <div className={styles.Appbar}>
      {links.map((link) => (
        <AppbarLinkItem key={link.href} {...link} />
      ))}
    </div>
  );
};
