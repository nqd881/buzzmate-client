import { Avatar } from "@chakra-ui/react";
import { useLastMessage } from "@hooks/data/use-last-message";
import { useCurrentChatId } from "@hooks/router/useCurrentChatId";
import { sassClasses } from "@utils";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { MouseEvent } from "react";
import styles from "./ChatroomItem.module.scss";

const cl = sassClasses(styles);

export type ChatroomData = any;

export type ChatroomItemProps = {
  data: ChatroomData;
};

export const ChatroomItem: React.FC<ChatroomItemProps> = ({ data }) => {
  const router = useRouter();

  const currentChatId = useCurrentChatId();
  const isCurrent = currentChatId == data?.id;

  const { message: lastMessage } = useLastMessage(data?.id);

  const handleClick = (e: MouseEvent) => {
    router.push(
      { pathname: router.pathname, query: { id: data.id } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const formatMessageDate = (date: Date | number | string) => {
    if (!date) return null;

    return format(new Date(date), "kk:mm");
  };

  const { title } = data || {};
  const { content, date } = lastMessage || {};

  return (
    <div
      className={cl(["ChatroomItem", isCurrent ? "current" : ""])}
      onClick={handleClick}
    >
      <div className={cl("avatar")}>
        <Avatar size="md" src={""} />
      </div>
      <div className={cl("info")}>
        <div className={cl("info_left")}>
          <span className={cl("name")}>{title}</span>
          <span className={cl("last_message")}>{content?.text}</span>
        </div>
        <div className={cl("info_right")}>
          <span className={cl("time")}>
            {date ? formatMessageDate(date) : null}
          </span>
          <span className={cl("seen")}>{/* <RiCheckDoubleLine /> */}</span>
        </div>
      </div>
    </div>
  );
};
