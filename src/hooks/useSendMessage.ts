import { sendMessageApi, SendMessagePayload } from "@apis/chat/send-message";
import { useChatSocketCtx } from "@contexts/ChatSocketContext";
import { useMutation } from "@tanstack/react-query";
import { v4 } from "uuid";
import { useCreateMessage } from "./data-x/useCreateMessage";

import { UpdateMessageFn, useMessages } from "./data-x/useMessages";

export const useSendMessage = (chatId: string) => {
  const { socket } = useChatSocketCtx();

  const { addMessages, updateMessage } = useMessages(chatId);

  const createMessage = useCreateMessage(chatId);

  const sendMessageMutation = useMutation({
    mutationKey: ["chats", chatId, "messages", "send"],
    mutationFn: (payload: SendMessagePayload) =>
      sendMessageApi(chatId, payload),
  });

  const sendMessage = async (
    payload: Omit<SendMessagePayload, "prepareMessageId">
  ) => {
    const prepareMessageId = v4();

    const newMessage = createMessage(
      { prepareMessageId, ...payload },
      (updater: UpdateMessageFn) => updateMessage(prepareMessageId, updater)
    );

    addMessages(newMessage);

    if (payload?.files) {
      sendMessageMutation.mutateAsync({
        ...payload,
        prepareMessageId,
      });

      return;
    }

    socket.emit("send_message", {
      chatId,
      prepareMessageId,
      message: payload?.message,
      replyToMessageId: payload?.replyToMessageId,
    });

    return prepareMessageId;
  };

  return sendMessage;
};
