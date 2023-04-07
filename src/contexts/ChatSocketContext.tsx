import { convertApiMessage } from "@hooks/convert/message";
import { useChats } from "@hooks/use-chats";
import { useMessages } from "@hooks/use-messages";
import { useCurrentChatId } from "@hooks/useCurrentChatId";
import { useSocket } from "@hooks/useSocket";
import React, { PropsWithChildren, useEffect } from "react";
import { Socket } from "socket.io-client";

export interface ChatSocketContextValue {
  socket: Socket;
}

const ChatSocketContext = React.createContext<ChatSocketContextValue>(
  {} as ChatSocketContextValue
);

export const ChatSocketProvider: React.FC<PropsWithChildren> = (props) => {
  const socket = useSocket({
    path: "/api/chat-svc/socket/socket.io",
    auth: (cb) => {
      cb({
        accessToken: localStorage.getItem("access_token"),
      });
    },
  });

  const { setChats } = useChats();

  useEffect(() => {
    if (!socket) return;

    socket.on("message_created", (message) => {
      const messageReceived = convertApiMessage(message);

      setChats((chats) =>
        chats.map((chat) => {
          if (chat.id === messageReceived.chatId) {
            const draftMessageIndex = chat.messages.findIndex(
              (message) => message.isDraft && message.id === messageReceived.id
            );

            console.log(draftMessageIndex);

            const shouldUpdate = draftMessageIndex >= 0;

            if (shouldUpdate)
              return {
                ...chat,
                messages: chat.messages.map((message, index) => {
                  if (index === draftMessageIndex)
                    return { ...messageReceived, content: message.content };

                  return message;
                }),
              };

            return {
              ...chat,
              messages: [...chat.messages, messageReceived],
            };
          }

          return chat;
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const value = {
    socket,
  };

  return (
    <ChatSocketContext.Provider value={value}>
      {props.children}
    </ChatSocketContext.Provider>
  );
};

export const useChatSocketCtx = () => React.useContext(ChatSocketContext);
