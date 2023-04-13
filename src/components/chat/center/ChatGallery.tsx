import { sassClasses } from "@utils";
import { useState } from "react";
import styles from "./ChatGallery.module.scss";

export type ChatGalleryProps = {
  onClose: () => void;
};

const cl = sassClasses(styles);

export const ChatGallery: React.FC<ChatGalleryProps> = ({ onClose }) => {
  const [currentItem, setCurrentItem] = useState();

  return (
    <div className={cl("ChatGallery")}>
      <div className={cl("overlay")} />
      <div className={cl("header")}></div>
      <div className={cl("view")}></div>
    </div>
  );
};
