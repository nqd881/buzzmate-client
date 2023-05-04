import { ApiMessage } from "@apis/models/chat";
import { localKey } from "@hooks/api-v2/keys";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { compareAsc } from "date-fns";
import { produce } from "immer";
import _ from "lodash";

export type MessageUpdater = (message: ApiMessage) => ApiMessage;

export const LOCAL_MESSAGES = (chatId: string) =>
  localKey((chatId) => [chatId, "messages"], chatId);

export const buildMessagesHandlers = (
  queryClient: QueryClient,
  chatId: string
) => {
  const queryKey = LOCAL_MESSAGES(chatId);

  const _compareMessagesById = (value: ApiMessage, other: ApiMessage) =>
    value.id === other.id;

  const _buildCompareMessageId = (messageId: string) => (message: ApiMessage) =>
    message.id === messageId;

  const _buildCompareChatId = (chatId: string) => (message: ApiMessage) =>
    message.chatId === chatId;

  const _uniqueMessages = (messages: ApiMessage[]) => {
    return _.uniqWith(messages, _compareMessagesById);
  };

  const _matchChatId = (messages: ApiMessage[]) => {
    return messages.filter(_buildCompareChatId(chatId));
  };

  const _sortMessagesAsc = (messages: ApiMessage[]) => {
    return [...messages].sort((a, b) => {
      const compareDateResult = compareAsc(new Date(a.date), new Date(b.date));

      if (compareDateResult === 0) return a.id <= b.id ? -1 : 1;

      return compareDateResult;
    });
  };

  const getMessages = () =>
    queryClient.getQueryData<ApiMessage[]>(queryKey) || [];

  const setMessages = (
    messagesUpdater: ApiMessage[] | ((messages: ApiMessage[]) => ApiMessage[])
  ) => {
    const _handle = (messages: ApiMessage[]) =>
      _sortMessagesAsc(_uniqueMessages(_matchChatId(messages)));

    queryClient.setQueryData<ApiMessage[]>(
      queryKey,
      (oldMessages: ApiMessage[]) => {
        if (typeof messagesUpdater === "function") {
          return _handle(messagesUpdater(oldMessages));
        }

        return _handle(messagesUpdater);
      }
    );
  };

  const findMessage = (messageId: string) => {
    const messages = getMessages();

    return messages.find(_buildCompareMessageId(messageId));
  };

  const getLastMessage = (): ApiMessage => {
    const messages = getMessages();

    return messages[messages.length - 1];
  };

  const addMessages = (...newMessages: ApiMessage[]) => {
    setMessages(
      produce((messages) => {
        for (let newMessage of newMessages) {
          messages.push(newMessage);
        }
      })
    );
  };

  const updateMessage = (
    updateMessageId: string,
    messageUpdater: Partial<ApiMessage> | MessageUpdater
  ) => {
    const compareMessageId = _buildCompareMessageId(updateMessageId);

    setMessages((messages) =>
      messages.map((message) => {
        if (compareMessageId(message)) {
          if (typeof messageUpdater === "function") {
            return messageUpdater(message);
          }

          return _.merge(message, messageUpdater);
        }

        return message;
      })
    );
  };

  const replaceMessage = (
    replaceMessageId: string,
    messageReplaced: ApiMessage
  ) => {
    setMessages((messages) =>
      messages.map((message) => {
        if (message.id === replaceMessageId) return messageReplaced;

        return message;
      })
    );
  };

  const removeMessages = (removeMessageIds: string[]) => {
    setMessages((messages) =>
      messages.filter((message) => removeMessageIds.includes(message.id))
    );
  };

  return {
    getMessages,
    setMessages,
    findMessage,
    getLastMessage,
    addMessages,
    updateMessage,
    replaceMessage,
    removeMessages,
  };
};

export const useMessages = (chatId: string) => {
  const queryKey = LOCAL_MESSAGES(chatId);

  const queryClient = useQueryClient();

  const messagesHandlers = buildMessagesHandlers(queryClient, chatId);

  useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData<ApiMessage[]>(queryKey) || [],
    initialData: [],
    staleTime: 0,
  });

  const messages = messagesHandlers.getMessages();

  return { messages, ...messagesHandlers };
};
