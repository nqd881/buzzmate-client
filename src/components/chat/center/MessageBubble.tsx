import { sassClasses } from "@utils";
import React from "react";
import styles from "./MessageBubble.module.scss";

const cl = sassClasses(styles);

export const MessageBubble = React.memo(function MessageBubble(props: {
  text: string;
  sentByMyself: boolean;
}) {
  return (
    <div
      className={cl([
        "MessageBubble",
        props?.sentByMyself ? "MessageMyBubble" : "MessageAnyBubble",
      ])}
    >
      <span>{props?.text}</span>
    </div>
  );
});
