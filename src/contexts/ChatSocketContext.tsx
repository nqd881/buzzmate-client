import { REMOTE_CHATS } from "@hooks/api-v2/useChatsQuery";
import { buildMessagesHandlers } from "@hooks/data-x/useMessages";
import { useSocket } from "@hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import React, { PropsWithChildren, useEffect } from "react";
import { Socket } from "socket.io-client";

export interface ChatSocketContextValue {
  socket: Socket;
}

const ChatSocketContext = React.createContext<ChatSocketContextValue>(
  {} as ChatSocketContextValue
);

export const ChatSocketProvider: React.FC<PropsWithChildren> = (props) => {
  const queryClient = useQueryClient();

  const socket = useSocket({
    path: "/api/chat-svc/socket/socket.io",
    auth: (cb) => {
      cb({
        accessToken: localStorage.getItem("access_token"),
      });
    },
    reconnection: true,
    reconnectionAttempts: 20,
  });

  useEffect(() => {
    if (!socket) return;

    socket.on("message_created", (message) => {
      const chatId = message.chatId;

      const { findMessage, addMessages, replaceMessage } =
        buildMessagesHandlers(queryClient, chatId);

      const localMessage = findMessage(message.id);

      if (localMessage) {
        replaceMessage(localMessage.id, message);

        return;
      }

      addMessages(message);
    });

    socket.on("join_new_chat", (chatId: string) => {
      console.log("Join new chat: ", chatId);

      queryClient.refetchQueries({
        queryKey: REMOTE_CHATS,
        exact: true,
        type: "all",
      });
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
