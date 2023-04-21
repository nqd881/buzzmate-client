import { getMessagesApi } from "@apis/chat/get-messages";
import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import { useChatsQuery } from "@hooks/api-v2/useChatsQuery";
import { useChats } from "@hooks/data-x/useChats";
import { buildMessagesHandlers } from "@hooks/data-x/useMessages";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { sassClasses } from "@utils";
import styles from "./ChatList.module.scss";
import { ChatroomItem } from "./ChatroomItem";

const cl = sassClasses(styles);

export const ChatList = () => {
  const queryClient = useQueryClient();

  useChatsQuery();

  const { chats, sortChatsDesc } = useChats();

  useQueries({
    queries: chats.map((chat) => {
      const queryKey = ["chats", chat.id, "messages", "initial"];

      const { getMessages, setMessages } = buildMessagesHandlers(
        queryClient,
        chat.id
      );

      const messages = getMessages();

      return {
        queryKey,
        queryFn: () =>
          getMessagesApi(chat.id, { beforeTime: new Date(), limit: 20 }),
        onSuccess: (messages) => {
          setMessages(messages);
        },
        enabled: Boolean(chats.length) && !Boolean(messages.length),
      };
    }),
  });

  return (
    <VerticalScrollableView>
      <div className={cl("ChatList")}>
        {sortChatsDesc(chats).map((chat) => (
          <ChatroomItem key={chat?.id} data={chat} />
        ))}
      </div>
    </VerticalScrollableView>
  );
};
