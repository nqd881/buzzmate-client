import {MouseEventHandler, ReactElement} from "react";
import {IconType} from "react-icons";
import {buildSassClassName} from "@utils/buildClassName";
import styles from "./Appbar.module.scss";

export type AppbarIconProps = {
  icon: IconType;
  active?: boolean;
  wrapIcon?: (icon: ReactElement) => JSX.Element;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

export const AppbarIcon: React.FC<AppbarIconProps> = (props) => {
  const {icon: Content, active, wrapIcon, onClick} = props;
  const wrapper = wrapIcon ?? ((icon) => icon);

  return wrapper(
    <div className={styles.AppbarIcon} onClick={onClick}>
      <Content size='1.5rem' />
      <div
        className={buildSassClassName(styles, [
          "wrapper",
          active ? "active" : "disable",
        ])}
      />
    </div>
  );
};
