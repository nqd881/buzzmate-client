import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import { useChatCenterContext } from "@contexts/ChatCenterContext";
import { useMessagesQuery } from "@hooks/api/useMessages.query";
import { useMessages } from "@hooks/use-messages";
import { useChatUserId } from "@hooks/useChatUserId";
import { useCurrentChatId } from "@hooks/useCurrentChatId";
import { sassClasses } from "@utils";
import React, { useEffect } from "react";
import { Message } from "src/models";
import { MessageGroup } from "./MessageGroup";
import styles from "./MessagesView.module.scss";

type MessageViewProps = {};

const cl = sassClasses(styles);

export const MessagesView: React.FC<MessageViewProps> = () => {
  const { windowViewRef, messageRef } = useChatCenterContext();

  const chatUserId = useChatUserId();

  const currentChatId = useCurrentChatId();

  useMessagesQuery(currentChatId);

  const { messages } = useMessages(currentChatId);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messageRef]);

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

      if (
        index !== 0 &&
        messages[index].senderUserId !== messages[index - 1].senderUserId
      ) {
        result.push(buildGroup(group));
        group = [];
      }

      group.push(messages[index]);
      index += 1;
    }

    return result;
  };

  return (
    <div className={cl("MessagesView")}>
      <VerticalScrollableView ref={windowViewRef}>
        {buildGroups(messages).map(
          (group) => group && <MessageGroup key={group.id} group={group} />
        )}
      </VerticalScrollableView>
    </div>
  );
};
