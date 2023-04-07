import React, {PropsWithChildren} from "react";
import {sassClasses} from "@utils";
import styles from "./SearchGroup.module.scss";

const cl = sassClasses(styles);

export type SearchGroupProps = {
  title?: string;
  isLastGroup?: boolean;
};

export const SearchGroup: React.FC<PropsWithChildren<SearchGroupProps>> = ({
  title,
  isLastGroup,
  children,
}) => {
  return (
    <div className={cl(["SearchGroup", isLastGroup ? "last-group" : ""])}>
      {title ? <div className={cl("title")}>{title}</div> : null}
      <div className={cl("content")}>{children}</div>
    </div>
  );
};
