import { Menu } from "@components/custom/Menu";
import { MenuItem } from "@components/custom/MenuItem";
import { useChatCenterContext } from "@contexts/ChatCenterContext";
import { useContextMenuPosition } from "@hooks";
import React, { useCallback, useRef } from "react";
import { sassClasses, VPP } from "@utils";
import styles from "./MessageContextMenu.module.scss";

import { TiArrowBackOutline, TiArrowForwardOutline } from "react-icons/ti";
import {
  MdContentCopy,
  MdOutlineCheckCircleOutline,
  MdOutlineDelete,
  MdOutlinePushPin,
} from "react-icons/md";
import { TbCopy } from "react-icons/tb";
import { useMessage } from "@hooks/data-x/useMessage";
import { useCurrentChatId } from "@hooks/router/useCurrentChatId";
import { usePinMessagesMutation } from "@hooks/api-v2/usePinMessagesMutation";
import { useHideMessagesMutation } from "@hooks/api-v2/useHideMessagesMutation";

const cl = sassClasses(styles);

type MessageContextProps = {
  isContextOpen: boolean;
  anchor: VPP;
  clearContextMenuPosition: () => void;
  closeContextMenu: () => void;
};

export const MessageContextMenu: React.FC<MessageContextProps> = ({
  isContextOpen,
  anchor,
  clearContextMenuPosition,
  closeContextMenu,
}) => {
  const {
    centerRef: rootRef,
    selectMessageHandlers,
    openContextMenuMessageId,
    setOpenContextMenuMessageId,
    setReplying,
    setReplyMessageId,
    setForwarding,
    setForwardMessageId,
  } = useChatCenterContext();
  const menuRef = useRef<HTMLDivElement>(null);

  const currentChatId = useCurrentChatId();
  const { message: openContextMenuMessage } = useMessage(
    currentChatId,
    openContextMenuMessageId
  );

  const pinMessagesMutation = usePinMessagesMutation();
  const hideMessageMutation = useHideMessagesMutation();

  const getRootElement = useCallback(() => rootRef.current, [rootRef]);
  const getMenuElement = useCallback(() => menuRef.current, [menuRef]);

  const { menuPosition, style } = useContextMenuPosition(
    anchor,
    getRootElement,
    getMenuElement,
    15,
    15
  );
  const menuTransformOrigin = anchor.getRelativeTo(menuPosition);

  const handleCloseContextMenu = () => {
    setOpenContextMenuMessageId(null);

    closeContextMenu();
  };

  const handleSelect = () => {
    selectMessageHandlers.selectMessages(openContextMenuMessageId);

    handleCloseContextMenu();
  };

  const handleReply = () => {
    setReplying(true);
    setReplyMessageId(openContextMenuMessageId);

    handleCloseContextMenu();
  };

  const handleCopy = () => {
    const text = openContextMenuMessage.content?.text;

    if (navigator && text) {
      try {
        navigator.clipboard.writeText(text);
      } catch (err) {
        console.log(err);
      }
    }

    handleCloseContextMenu();
  };

  const handlePin = () => {
    pinMessagesMutation.mutateAsync({
      chatId: currentChatId,
      messageIds: [openContextMenuMessageId],
      shouldPin: true,
    });

    handleCloseContextMenu();
  };

  const handleForward = () => {
    setForwarding(true);
    setForwardMessageId(openContextMenuMessageId);

    handleCloseContextMenu();
  };

  const handleDelete = () => {
    hideMessageMutation.mutateAsync({
      chatId: currentChatId,
      messageIds: [openContextMenuMessageId],
    });

    handleCloseContextMenu();
  };

  return (
    <Menu
      menuRef={menuRef}
      className={cl("MessageContextMenu")}
      isOpen={isContextOpen}
      style={style}
      positionX={menuTransformOrigin.x}
      positionY={menuTransformOrigin.y}
      onCloseTransitionEnd={clearContextMenuPosition}
      onClose={handleCloseContextMenu}
      shadow
    >
      <MenuItem icon={TiArrowBackOutline} onClick={handleReply}>
        Reply
      </MenuItem>
      <MenuItem icon={TbCopy} onClick={handleCopy}>
        Copy
      </MenuItem>
      <MenuItem icon={MdOutlinePushPin} onClick={handlePin}>
        Pin
      </MenuItem>
      <MenuItem icon={TiArrowForwardOutline} onClick={handleForward}>
        Forward
      </MenuItem>
      <MenuItem icon={MdOutlineCheckCircleOutline} onClick={handleSelect}>
        Select
      </MenuItem>
      <MenuItem
        icon={MdOutlineDelete}
        onClick={handleDelete}
        style={{ color: "#dc0400" }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};
