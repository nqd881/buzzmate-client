import { ApiMessage } from "@apis/models/chat";
import { KEY_LIST_MESSAGES_OF_CHAT } from "@hooks/api-v2/keys";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { compareAsc } from "date-fns";
import _ from "lodash";

export type UpdateMessageFn = (oldMessage: ApiMessage) => ApiMessage;

export const buildMessagesHandlers = (
  queryClient: QueryClient,
  chatId: string
) => {
  const queryKey = KEY_LIST_MESSAGES_OF_CHAT(chatId);

  const _compareMessageById = (value: ApiMessage, other: ApiMessage) =>
    value.id === other.id;

  const _matchChatId = (message: Partial<ApiMessage>) =>
    message?.chatId === chatId;

  const _getUniqueMessages = (messages: ApiMessage[]) => {
    return _.uniqWith(messages, _compareMessageById);
  };

  const _getMatchChatId = (messages: ApiMessage[]) => {
    return messages.filter(_matchChatId);
  };

  const getMessages = () =>
    _getUniqueMessages(
      queryClient.getQueryData<ApiMessage[]>(queryKey) || []
    )?.sort((a, b) => {
      const compareDateResult = compareAsc(new Date(a.date), new Date(b.date));

      if (compareDateResult === 0) return a.id <= b.id ? -1 : 1;

      return compareDateResult;
    });

  const setMessages = (
    messagesUpdater: ApiMessage[] | ((messages: ApiMessage[]) => ApiMessage[])
  ) => {
    const handleMessagesBeforeSet = (messages: ApiMessage[]) =>
      _getUniqueMessages(_getMatchChatId(messages));

    queryClient.setQueryData<ApiMessage[]>(
      queryKey,
      (oldMessages: ApiMessage[]) => {
        if (typeof messagesUpdater === "function") {
          return handleMessagesBeforeSet(messagesUpdater(oldMessages));
        }

        return handleMessagesBeforeSet(messagesUpdater);
      }
    );
  };

  const findMessageIndex = (messageId: string) => {
    const messages = getMessages();

    return messages.findIndex((message) => message.id === messageId);
  };

  const findMessage = (messageId: string) => {
    const messages = getMessages();

    return messages.find((message) => message.id === messageId);
  };

  const getLastMessage = (): ApiMessage => {
    const messages = getMessages();

    return messages[messages.length - 1];
  };

  const addMessages = (...newMessages: ApiMessage[]) => {
    const handleMessageBeforeAdd = (messages: ApiMessage[]) =>
      _getUniqueMessages(_getMatchChatId(messages));

    setMessages((messages) => [
      ...messages,
      ...handleMessageBeforeAdd(
        _.differenceWith(newMessages, messages, _compareMessageById)
      ),
    ]);
  };

  const updateMessage = (
    updateMessageId: string,
    messageUpdater: Partial<ApiMessage> | UpdateMessageFn
  ) => {
    setMessages((messages) =>
      messages.map((message) => {
        if (message.id === updateMessageId) {
          if (typeof messageUpdater === "function") {
            const _message = messageUpdater(message);

            if (_matchChatId(_message)) return _message;

            return message;
          }

          if (_matchChatId(messageUpdater))
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
    if (!_matchChatId(messageReplaced)) return;

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
    findMessageIndex,
    getLastMessage,
    addMessages,
    updateMessage,
    replaceMessage,
    removeMessages,
  };
};

export const useMessages = (chatId: string) => {
  const queryKey = KEY_LIST_MESSAGES_OF_CHAT(chatId);

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
