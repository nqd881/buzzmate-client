import {
  Avatar,
  Box,
  Checkbox,
  Image as ImageCharka,
  VStack,
} from "@chakra-ui/react";
import { useChatCenterContext } from "@contexts/ChatCenterContext";
import React, { useEffect, useRef, useState } from "react";
import { sassClasses } from "@utils";
import styles from "./Message.module.scss";
import { ApiMessage } from "@apis/models/chat";
import { Message as MessageModel } from "src/models";
import Image from "next/image";
import { useLastMessageId } from "@hooks/use-last-message";

const cl = sassClasses(styles);

export type MessageProps = {
  message: MessageModel;
  sentByMyself: boolean;
  isLastMessage?: boolean;
};

export const Message: React.FC<MessageProps> = ({
  message,
  sentByMyself,
  isLastMessage,
}) => {
  const { content } = message;

  const lastMessageId = useLastMessageId(message?.chatId);

  const isLastMessageOfChat = message?.id === lastMessageId;

  const {
    messageRef,
    selectMessageHandlers,
    contextMenuHandlers,
    setCurrentMessage,
  } = useChatCenterContext();
  const { selectedMessagesCount, toggleSelectMessage, isSelectedMessage } =
    selectMessageHandlers;
  const isSelected = isSelectedMessage(message.id as string);
  const { openContextMenu } = contextMenuHandlers;

  const [reload, setReload] = useState(0);

  useEffect(() => {
    setReload((reload) => reload + 1);

    console.log(`Content change in ${message?.id}`);
  }, [content]);

  const handleSelectMessage = () => {
    toggleSelectMessage(message?.id);
  };

  const handleContextMenu = (ev: React.MouseEvent) => {
    openContextMenu(ev);
    setCurrentMessage(message?.id);
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
      ref={isLastMessageOfChat ? messageRef : null}
      className={fullClassName}
      onContextMenu={handleContextMenu}
      onClick={selectedMessagesCount ? handleSelectMessage : undefined}
    >
      <Checkbox
        className={cl("checkbox")}
        colorScheme="green"
        isChecked={isSelected}
      />
      <div className={cl("content")}>
        <Avatar className={cl("avatar")} />
        <div className={cl("bubble")}>
          {content?.text && <span>{content?.text}</span>}
          {(content?.photos || content?.videos) && (
            <VStack>
              {content?.photos?.map((photo) => (
                <ImageCharka
                  key={photo.id}
                  src={
                    Boolean(photo.localUri) ? photo.localUri : photo.remoteUri
                  }
                />
              ))}
              {content?.videos?.map((video) => (
                <video key={video.id} src={video.uri} controls />
              ))}
            </VStack>
          )}
        </div>
      </div>
      <div className={cl("openable-context-menu")} />
    </div>
  );
};
