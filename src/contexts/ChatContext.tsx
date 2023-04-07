import { isUndefined } from "@utils";
import React, { PropsWithChildren, RefObject, useRef, useState } from "react";
import { Chat } from "src/models";

type ChatContextValue = {
  chatAppRef: RefObject<HTMLDivElement>;
  openRightSide: boolean;
  toggleOpenRightSide: (open?: boolean) => void;
  rightSide: ChatRightSide;
  setRightSide: (side: ChatRightSide) => void;
  handleOpenSide: (side: ChatRightSide) => void;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
};

export enum ChatRightSide {
  PROFILE,
  SEARCH,
}

const ChatContext = React.createContext<ChatContextValue>(
  {} as ChatContextValue
);

export const useChatCtx = () => React.useContext(ChatContext);

export const ChatProvider: React.FC<PropsWithChildren> = (props) => {
  const chatAppRef = useRef<HTMLDivElement>(null);
  const [openRightSide, setOpenRightSide] = useState(false);
  const [rightSide, setRightSide] = useState<ChatRightSide>(
    ChatRightSide.PROFILE
  );

  const [chats, setChats] = useState([]);

  const toggleOpenRightSide = (open?: boolean) => {
    if (!isUndefined(open)) setOpenRightSide(open);
    else setOpenRightSide((preOpenRightSide) => !preOpenRightSide);
  };

  const handleOpenSide = (side: ChatRightSide) => {
    if (!openRightSide) toggleOpenRightSide(true);
    else if (rightSide === side) toggleOpenRightSide();
    setRightSide(side);
  };

  const value = {
    chatAppRef,
    openRightSide,
    toggleOpenRightSide,
    rightSide,
    setRightSide,
    handleOpenSide,
    chats,
    setChats,
  };

  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
};
