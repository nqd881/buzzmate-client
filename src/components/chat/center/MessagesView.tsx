import { getMessagesApi } from "@apis/chat/get-messages";
import { ApiMessage } from "@apis/models/chat";
import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import { useChatCenterContext } from "@contexts/ChatCenterContext";
import { useInitialMessages } from "@hooks/api-v2/useInitMessages";
import { useMessages } from "@hooks/data-x/useMessages";
import { useCurrentChatId } from "@hooks/router/useCurrentChatId";
import { useChatUserId } from "@hooks/useChatUserId";
import { sassClasses } from "@utils";
import _ from "lodash";
import ms from "ms";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Message } from "src/models";
import { MessageGroup } from "./MessageGroup";
import styles from "./MessagesView.module.scss";

type MessageViewProps = {};

const cl = sassClasses(styles);

export const MessagesView: React.FC<MessageViewProps> = () => {
  const { messageViewRef } = useChatCenterContext();

  const chatUserId = useChatUserId();

  const currentChatId = useCurrentChatId();

  const { messages, addMessages } = useMessages(currentChatId);

  const [fetchingPrevious, setFetchingPrevious] = useState(false);

  const calCurrentScrollBottom = useCallback(() => {
    const elem = messageViewRef.current;

    if (!elem) return null;

    return elem.scrollHeight - elem.scrollTop;
  }, [messageViewRef]);

  const currentScrollBottom = useRef(calCurrentScrollBottom());

  const updateCurrentScrollBottom = useCallback(() => {
    currentScrollBottom.current = calCurrentScrollBottom();
  }, [calCurrentScrollBottom]);

  const buildGroups = (messages: ApiMessage[]) => {
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

    if (!messages) return result;

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
        new Date(messages[index].date).getTime() -
          new Date(messages[index - 1].date).getTime() >=
          ms("3m");

      if (changeSender || timeBreak) {
        result.push(buildGroup(group));
        group = [];
      }

      group.push(messages[index]);
      index += 1;
    }

    return result;
  };

  useInitialMessages(currentChatId);

  useEffect(() => {
    setFetchingPrevious(false);
  }, [currentChatId]);

  useEffect(() => {
    const elem = messageViewRef.current;

    elem?.scrollTo({ top: elem.scrollHeight || elem.clientHeight });
  }, [messageViewRef, currentChatId]);

  useEffect(() => {
    const elem = messageViewRef.current;

    if (!elem) return;

    const fetchPreviousMessages = async () => {
      try {
        setFetchingPrevious(true);

        const preMessages = await getMessagesApi(currentChatId, {
          limit: 20,
          beforeMessageId: messages[0].id,
        }).finally(() => {
          setFetchingPrevious(false);
        });

        addMessages(...preMessages);
      } catch (err) {
        console.log("Error when fetch previous messages: ", err);
      }
    };

    const handleScroll = () => {
      updateCurrentScrollBottom();

      const scrollTop = elem.scrollTop;

      if (scrollTop === 0 && !fetchingPrevious) {
        fetchPreviousMessages();
      }
    };

    elem.addEventListener("scroll", handleScroll);

    return () => {
      elem.removeEventListener("scroll", handleScroll);
    };
  }, [
    messageViewRef,
    messages,
    currentChatId,
    fetchingPrevious,
    updateCurrentScrollBottom,
    addMessages,
  ]);

  useLayoutEffect(() => {
    const elem = messageViewRef.current;

    if (!elem) return;

    elem.scrollTop = elem.scrollHeight - currentScrollBottom.current;
  }, [messageViewRef, messages]);

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
