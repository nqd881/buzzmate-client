import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import { useChatCenterContext } from "@contexts/ChatCenterContext";
import { useMessagesQuery } from "@hooks/api/useMessages.query";
import { useMessages } from "@hooks/data/use-messages";
import { useCurrentChatId } from "@hooks/router/useCurrentChatId";
import { useChatUserId } from "@hooks/useChatUserId";
import { sassClasses } from "@utils";
import React, { useEffect, useState } from "react";
import { Message } from "src/models";
import { MessageGroup } from "./MessageGroup";
import styles from "./MessagesView.module.scss";

type MessageViewProps = {};

const cl = sassClasses(styles);

export const MessagesView: React.FC<MessageViewProps> = () => {
  const { messageViewRef, lastMessageRef } = useChatCenterContext();

  const chatUserId = useChatUserId();

  const currentChatId = useCurrentChatId();

  useMessagesQuery(currentChatId);

  const { messages } = useMessages(currentChatId);

  const buildGroups = (messages: Message[]) => {
    const result = [];

    let index = 0,
      group = [];

    const buildGroup = (messages: Message[]) => {
      if (!messages.length) return null;

      const first = messages?.[0];

      const validSameSender = !messages.some(
        (message) => message.senderUserId !== first.senderUserId
      );

      if (!validSameSender)
        throw new Error("All messages in a group must have the same sender");

      return {
        id: first.id,
        senderUserId: first.senderUserId,
        sentByMyself: first.senderUserId === chatUserId,
        messages,
      };
    };

    while (index <= messages.length) {
      if (index === messages.length) {
        result.push(buildGroup(group));
        break;
      }

      const changeSender =
        index !== 0 &&
        messages[index].senderUserId !== messages[index - 1].senderUserId;

      const timeBreak =
        index !== 0 &&
        messages[index].date.getTime() - messages[index - 1].date.getTime() >=
          3 * 60 * 1000;

      if (changeSender || timeBreak) {
        result.push(buildGroup(group));
        group = [];
      }

      group.push(messages[index]);
      index += 1;
    }

    return result;
  };

  useEffect(() => {
    const scrollToLastMessage = () => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    scrollToLastMessage();
  }, [messages, lastMessageRef]);

  // const handleClick = () => {
  //   const lastMessageOffsetTop = lastMessageRef.current?.offsetTop;

  //   const lastMessageRect = lastMessageRef.current?.getBoundingClientRect();

  //   messageViewRef.current?.scrollTo({
  //     top: lastMessageOffsetTop + lastMessageRect?.width,
  //     behavior: "smooth",
  //   });

  //   lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <div className={cl("MessagesView")}>
      <VerticalScrollableView ref={messageViewRef}>
        {buildGroups(messages).map(
          (group) => group && <MessageGroup key={group.id} group={group} />
        )}
      </VerticalScrollableView>
    </div>
  );
};
