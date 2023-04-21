import { useContextMenuHandlers } from "@hooks";
import { useSelected } from "@hooks";
import React, {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

const useSelectedMessageHandlers = () => {
  const {
    selected: selectedMessages,
    selectedCount: selectedMessagesCount,
    select: selectMessages,
    unSelect: unSelectMessages,
    isSelected: isSelectedMessage,
    toggleSelect: toggleSelectMessage,
    clear: clearAllSelectedMessages,
  } = useSelected<string>();

  return {
    selectedMessages,
    selectedMessagesCount,
    selectMessages,
    unSelectMessages,
    isSelectedMessage,
    toggleSelectMessage,
    clearAllSelectedMessages,
  };
};

type ChatCenterContextValue = {
  centerRef: RefObject<HTMLDivElement>;
  messageViewRef: RefObject<HTMLDivElement>;
  messageRef: RefObject<HTMLDivElement>;
  lastMessageRef: RefObject<HTMLDivElement>;
  selectMessageHandlers: ReturnType<typeof useSelectedMessageHandlers>;
  contextMenuHandlers: ReturnType<typeof useContextMenuHandlers>;
  openContextMenuMessageId: string;
  setOpenContextMenuMessageId: Dispatch<SetStateAction<string>>;
  replying: boolean;
  setReplying: Dispatch<SetStateAction<boolean>>;
  replyMessageId: string;
  setReplyMessageId: Dispatch<SetStateAction<string>>;
  forwarding: boolean;
  setForwarding: Dispatch<SetStateAction<boolean>>;
  forwardMessageId: string;
  setForwardMessageId: Dispatch<SetStateAction<string>>;
};

const ChatCenterContext = React.createContext({} as ChatCenterContextValue);

export const useChatCenterContext = () => React.useContext(ChatCenterContext);

export const ChatCenterContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const centerRef = useRef<HTMLDivElement>(null);
  const messageViewRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const selectMessageHandlers = useSelectedMessageHandlers();
  const contextMenuHandlers = useContextMenuHandlers();

  const [openContextMenuMessageId, setOpenContextMenuMessageId] =
    useState(null);

  const [forwarding, setForwarding] = useState(false);
  const [forwardMessageId, setForwardMessageId] = useState(null);

  const [replying, setReplying] = useState(false);
  const [replyMessageId, setReplyMessageId] = useState(null);

  const value = {
    messageViewRef,
    centerRef,
    messageRef,
    lastMessageRef,
    selectMessageHandlers,
    contextMenuHandlers,
    openContextMenuMessageId,
    setOpenContextMenuMessageId,
    replying,
    setReplying,
    replyMessageId,
    setReplyMessageId,
    forwarding,
    setForwarding,
    forwardMessageId,
    setForwardMessageId,
  };

  return (
    <ChatCenterContext.Provider value={value}>
      {children}
    </ChatCenterContext.Provider>
  );
};
