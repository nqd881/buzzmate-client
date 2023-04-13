import { sendMessageApi, SendMessagePayload } from "@apis/chat/send-message";
import { useChatSocketCtx } from "@contexts/ChatSocketContext";
import { useMutation } from "@tanstack/react-query";
import { compareAsc } from "date-fns";
import _ from "lodash";
import { Message } from "src/models";
import { useChat } from "./use-chat";
import { v4 } from "uuid";
import { isPhotoFile, isVideoFile } from "@utils/file";
import { useChatUserId } from "@hooks/useChatUserId";

export const useMessages = (chatId: string) => {
  const chatUserId = useChatUserId();

  const { chat, update: updateChat } = useChat(chatId);

  const { socket } = useChatSocketCtx();

  const findMessageIndex = (messageId: string) => {
    return chat?.messages.findIndex((message) => message.id === messageId);
  };

  const findMessage = (messageId: string) => {
    const index = findMessageIndex(messageId);

    return chat?.messages[index];
  };

  const setMessage = (
    messageId: string,
    updateMessage: ((message: Message) => Message) | Partial<Message>,
    merge = false
  ) => {
    updateChat((chat) => ({
      ...chat,
      messages: chat.messages.map((message) => {
        if (message.id === messageId) {
          if (typeof updateMessage === "function")
            return updateMessage(message);

          return (
            !merge ? updateMessage : _.merge(message, updateMessage)
          ) as Message;
        }

        return message;
      }),
    }));
  };

  const addMessage = (newMessage: Message) => {
    updateChat((chat) => {
      const existMessage = findMessage(newMessage.id);

      if (existMessage) return chat;

      return {
        ...chat,
        messages: [...chat.messages, newMessage],
      };
    });
  };

  const removeMessage = (messageId: string) => {
    updateChat((chat) => ({
      ...chat,
      messages: chat.messages.filter((message) => message.id !== messageId),
    }));
  };

  const sendMessageMutation = useMutation({
    mutationFn: (payload: SendMessagePayload) =>
      sendMessageApi(chatId, payload),

    onSuccess: (data, vars) => {},
    onError: (error) => {
      console.log(error);
    },
  });

  const createDraftMessage = (
    payload: SendMessagePayload,
    prepareMessageId: string
  ): Message => {
    const { message, replyToMessageId, files } = payload;

    const photoFiles = [],
      videoFiles = [],
      documentFiles = [];

    if (files) {
      for (let index = 0; index < files.length; index++) {
        let file = files[index];

        switch (true) {
          case isPhotoFile(file): {
            photoFiles.push({ localId: v4(), file });
            break;
          }
          case isVideoFile(file): {
            videoFiles.push({ localId: v4(), file });
            break;
          }
          default: {
            documentFiles.push({ localId: v4(), file });
          }
        }
      }
    }

    photoFiles?.forEach(({ localId, file: photoFile }) => {
      const reader = new FileReader();
      reader.readAsDataURL(photoFile);

      reader.onload = () => {
        setMessage(
          prepareMessageId,
          (message) => ({
            ...message,
            content: {
              ...message.content,
              photos: message.content.photos.map((photo) => {
                if (photo.id === localId) {
                  return {
                    ...photo,
                    localUri: reader.result as string,
                  };
                }

                return photo;
              }),
            },
          }),
          true
        );
      };
    });

    return {
      id: prepareMessageId,
      chatId,
      content: {
        text: message ?? null,
        photos: photoFiles.map(({ localId, file: photoFile }) => ({
          id: localId,
          isLocal: true,
          localUri: "",
          remoteUri: "",
          isSending: true,
        })),
        // videos: [],
        videos: videoFiles.map(({ localId, file: videoFile }) => ({
          id: localId,
          thumbnailUri: "",
          uri: URL.createObjectURL(videoFile),
        })),
      },
      date: new Date(),
      editDate: null,
      replyToMessageId,
      senderUserId: chatUserId,
      sentByMember: null,
      isSending: true,
      isDraft: true,
    };
  };

  const sortMessages = (messages: Message[]) => {
    messages.sort((a, b) => {
      const compareDateResult = compareAsc(a.date, b.date);

      if (compareDateResult === 0) return a.id <= b.id ? -1 : 1;

      return compareDateResult;
    });

    return messages;
  };

  const sendMessage = async (
    payload: Omit<SendMessagePayload, "prepareMessageId">
  ) => {
    const prepareMessageId = v4();

    const draftMessage = createDraftMessage(payload, prepareMessageId);

    addMessage(draftMessage);

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

  return {
    messages: sortMessages(chat?.messages ?? []),
    findMessageIndex,
    findMessage,
    setMessage,
    addMessage,
    removeMessage,
    sendMessage,
  };
};

export const useSendMessage = (chatId: string) => {};
