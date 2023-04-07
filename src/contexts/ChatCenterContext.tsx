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
  currentMessage: string | undefined;
  centerRef: RefObject<HTMLDivElement>;
  windowViewRef: RefObject<HTMLDivElement>;
  messageRef: RefObject<HTMLDivElement>;
  selectMessageHandlers: ReturnType<typeof useSelectedMessageHandlers>;
  contextMenuHandlers: ReturnType<typeof useContextMenuHandlers>;
  setCurrentMessage: Dispatch<SetStateAction<string | undefined>>;
};

const ChatCenterContext = React.createContext({} as ChatCenterContextValue);

export const useChatCenterContext = () => React.useContext(ChatCenterContext);

export const ChatCenterContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const centerRef = useRef<HTMLDivElement>(null);
  const windowViewRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  const selectMessageHandlers = useSelectedMessageHandlers();
  const contextMenuHandlers = useContextMenuHandlers();

  const [currentMessage, setCurrentMessage] = useState<string | undefined>(
    undefined
  );

  const value = {
    currentMessage,
    windowViewRef,
    centerRef,
    messageRef,
    selectMessageHandlers,
    contextMenuHandlers,
    setCurrentMessage,
  };

  return (
    <ChatCenterContext.Provider value={value}>
      {children}
    </ChatCenterContext.Provider>
  );
};
