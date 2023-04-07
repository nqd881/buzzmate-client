import {sassClasses} from "@utils";
import {ReactElement} from "react";
import {Appbar} from "./Appbar/Appbar";
import styles from "./AppPageWithAppbarLayout.module.scss";
import {Background} from "./Background";

const cl = sassClasses(styles);

export const AppPageWithAppbarLayout = (page: ReactElement) => {
  return (
    <div className={cl("root")}>
      <Appbar />
      <div className={cl("app")}>
        {page}
        <Background />
      </div>
    </div>
  );
};
