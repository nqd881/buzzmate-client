import React, {ComponentProps, PropsWithChildren} from "react";
import {IconType} from "react-icons";
import {sassClasses} from "@utils";
import styles from "./MenuItem.module.scss";

const cl = sassClasses(styles);

export type MenuItemProps = ComponentProps<"div"> & {
  icon?: IconType;
  disabled?: boolean;
};

export const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({
  icon: Icon,
  className,
  disabled,
  children,
  ...otherProps
}) => {
  const fullClassName = cl(["MenuItem", disabled ? "disabled" : ""], className);

  return (
    <div className={fullClassName} {...otherProps}>
      {Icon ? <Icon className={cl("icon")} /> : null}
      <span>{children}</span>
    </div>
  );
};
