import React from "react";
import {sassClasses} from "@utils";
import styles from "./VoiceTab.module.scss";

const cl = sassClasses(styles);

export const VoiceTab = () => {
  return <div className={cl("VoiceTab")}>VoiceTab</div>;
};
