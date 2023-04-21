import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import { useChatsQuery } from "@hooks/api-v2/useChatsQuery";
import { useChats } from "@hooks/data-x/useChats";
import { sassClasses } from "@utils";
import styles from "./ChatList.module.scss";
import { ChatroomItem } from "./ChatroomItem";

const cl = sassClasses(styles);

export const ChatList = () => {
  useChatsQuery();

  const { chats, sortChatsDesc } = useChats();

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
