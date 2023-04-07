import React, {ComponentPropsWithRef, ReactElement} from "react";
import {sassClasses} from "@utils";
import styles from "./IconButton.module.scss";

const cl = sassClasses(styles);

export type IconButtonProps = ComponentPropsWithRef<"button"> & {
  icon: ReactElement;
};

export const IconButton: React.FC<IconButtonProps> = ({icon, ...props}) => {
  // console.log(props.className)

  return (
    <button className={cl("IconButton")} {...props}>
      {icon}
    </button>
  );
};
