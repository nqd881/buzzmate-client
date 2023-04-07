import { ApiMessage } from "@apis/models/chat";
import { sassClasses } from "@utils";
import React from "react";
import { Message as MessageModel } from "src/models";
import { Message } from "./Message";
import styles from "./MessageGroup.module.scss";

const cl = sassClasses(styles);

export type MessageGroupProps = {
  group: {
    id: string;
    senderUserId: string;
    sentByMyself: boolean;
    messages: MessageModel[];
  };
};

export const MessageGroup: React.FC<MessageGroupProps> = (props) => {
  const { senderUserId, sentByMyself, messages } = props?.group;

  const checkIsLastMessage = (index: number) => index === messages.length - 1;

  return (
    <div className={cl("MessageGroup")}>
      {(messages || []).map((message, index) => (
        <Message
          key={message.id}
          sentByMyself={sentByMyself}
          message={message}
          isLastMessage={checkIsLastMessage(index)}
        />
      ))}
    </div>
  );
};
