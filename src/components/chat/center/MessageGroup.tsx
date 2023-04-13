import { ApiMessage } from "@apis/models/chat";
import { sassClasses } from "@utils";
import {
  differenceInDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  format,
} from "date-fns";
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
  const { sentByMyself, messages } = props?.group;

  const checkIsLastMessage = (index: number) => index === messages.length - 1;

  const firstMessage = messages[0];

  const formatTime = (date: Date) => {
    const now = new Date();

    const differenceDays = differenceInDays(now, date);
    const differenceWeeks = differenceInWeeks(now, date);
    const differenceYears = differenceInYears(now, date);

    if (differenceDays < 1) return format(date, "kk:mm");

    if (differenceWeeks < 1) return format(date, "EEEE, kk:mm");

    if (differenceYears < 1) return format(date, "LLLL d");

    return format(date, "LLLL d, yyyy");
  };

  return (
    <div className={cl("MessageGroup")}>
      <div className={cl("time_box")}>
        <span className={cl("formatted_time")}>
          {formatTime(firstMessage.date)}
        </span>
      </div>
      {messages?.map((message, index) => (
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
