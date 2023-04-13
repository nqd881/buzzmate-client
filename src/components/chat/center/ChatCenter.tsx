import { useChatCenterContext } from "@contexts/ChatCenterContext";
import { useChatCtx } from "@contexts/ChatContext";
import { useCurrentChatId } from "@hooks/router/useCurrentChatId";
import { sassClasses } from "@utils/buildClassName";
import { useState } from "react";
import { CenterHeader } from "./CenterHeader";
import styles from "./ChatCenter.module.scss";
import { ChatGallery } from "./ChatGallery";
import { MessageContextMenu } from "./MessageContextMenu";
import { MessageInput } from "./MessageInput";
import { MessagesView } from "./MessagesView";

const cl = sassClasses(styles);

export const ChatCenter = () => {
  const { openRightSide } = useChatCtx();
  const { centerRef, contextMenuHandlers } = useChatCenterContext();

  const [openChatGallery, setOpenChatGallery] = useState(false);

  const closeChatGallery = () => {
    setOpenChatGallery(false);
  };

  const currentChatId = useCurrentChatId();

  const {
    isContextMenuOpen,
    contextMenuPosition,
    closeContextMenu,
    clearContextMenuPosition,
  } = contextMenuHandlers;

  return (
    <div
      ref={centerRef}
      className={cl(["ChatCenter", openRightSide ? "" : "expanded"])}
    >
      {currentChatId && (
        <>
          <CenterHeader />
          <MessagesView />
          <MessageInput />
          {openChatGallery && <ChatGallery onClose={closeChatGallery} />}
        </>
      )}
      {contextMenuPosition && (
        <MessageContextMenu
          isContextOpen={isContextMenuOpen}
          anchor={contextMenuPosition}
          clearContextMenuPosition={clearContextMenuPosition}
          closeContextMenu={closeContextMenu}
        />
      )}
    </div>
  );
};

export default ChatCenter;
