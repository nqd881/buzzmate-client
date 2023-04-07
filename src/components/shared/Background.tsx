import React from "react";
import {sassClasses} from "@utils";
import styles from "./Background.module.scss";

const cl = sassClasses(styles);

export const Background = () => {
  return (
    <div className={cl("Background")}>
      <div className={cl("bg")} />
    </div>
  );
};
