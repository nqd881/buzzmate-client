import { ApiMessage } from "@apis/models/chat";
import { Avatar, Checkbox } from "@chakra-ui/react";
import { useChatCenterContext } from "@contexts/ChatCenterContext";
import { useLastMessage } from "@hooks/data-x/useLastMessage";
import { sassClasses } from "@utils";
import React from "react";
import { Message as MessageModel } from "src/models";
import styles from "./Message.module.scss";
import { MessageBubble } from "./MessageBubble";
import { MessageGallery } from "./MessageGallery";

const cl = sassClasses(styles);

export type MessageProps = {
  message: ApiMessage;
  sentByMyself: boolean;
  isLastMessage?: boolean;
};

export const Message: React.FC<MessageProps> = ({
  message,
  sentByMyself,
  isLastMessage,
}) => {
  const { content } = message;

  const lastMessage = useLastMessage(message?.chatId);

  const isLastMessageOfChat = message?.id === lastMessage?.id;

  const {
    lastMessageRef,
    selectMessageHandlers,
    contextMenuHandlers,
    setOpenContextMenuMessageId,
  } = useChatCenterContext();
  const { selectedMessagesCount, toggleSelectMessage, isSelectedMessage } =
    selectMessageHandlers;
  const isSelected = isSelectedMessage(message.id as string);
  const { openContextMenu } = contextMenuHandlers;

  const handleSelectMessage = () => {
    toggleSelectMessage(message?.id);
  };

  const handleContextMenu = (ev: React.MouseEvent) => {
    openContextMenu(ev);

    setOpenContextMenuMessageId(message?.id);
  };

  const fullClassName = cl([
    "Message",
    sentByMyself ? "my-message" : "your-message",
    isLastMessage ? "last-message" : "",
    isSelected ? "is-selected" : "",
    selectedMessagesCount ? "mode-select" : "",
  ]);

  return (
    <div
      ref={isLastMessageOfChat ? lastMessageRef : null}
      className={fullClassName}
      onContextMenu={handleContextMenu}
      onClick={selectedMessagesCount ? handleSelectMessage : undefined}
    >
      <div className={cl("box")}>
        <Checkbox
          className={cl("checkbox")}
          colorScheme="green"
          isChecked={isSelected}
        />
        <div className={cl("content")}>
          <Avatar className={cl("avatar")} />
          <div className={cl("content_content")}>
            {content?.text && (
              <MessageBubble text={content?.text} sentByMyself={sentByMyself} />
            )}
            {Boolean(content.photos?.length || content.videos?.length) && (
              <MessageGallery
                photos={content?.photos}
                videos={content?.videos}
                direction={sentByMyself ? "rtl" : "ltr"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
