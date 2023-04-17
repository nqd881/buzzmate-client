import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import { useChatCtx } from "@contexts/ChatContext";
import { useInitialChatsQuery } from "@hooks/api/useInitialChats.query";
import { sassClasses } from "@utils";
import styles from "./ChatList.module.scss";
import { ChatroomItem } from "./ChatroomItem";

const cl = sassClasses(styles);

export const ChatList = () => {
  useInitialChatsQuery();

  const { chats } = useChatCtx();

  return (
    <VerticalScrollableView>
      <div className={cl("ChatList")}>
        {chats?.map((chatroom) => (
          <ChatroomItem key={chatroom?.id} data={chatroom} />
        ))}
      </div>
    </VerticalScrollableView>
  );
};
