import {sassClasses} from "@utils/buildClassName";
import {PropsWithChildren} from "react";
import styles from "./Appbar.module.scss";

interface AppbarIconBoxProps {
  active?: boolean;
}

const cl = sassClasses(styles);

export const AppbarIconBox: React.FC<PropsWithChildren<AppbarIconBoxProps>> = ({
  children,
  active,
}) => {
  return (
    <div className={cl("AppbarIconBox")}>
      <div className={cl("wrap-child")}>
        {children}
        <div className={cl(["marker", active ? "active" : "disable"])} />
      </div>
    </div>
  );
};
