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
    idMessageOpenContextMenu,
    setIdMessageOpenContextMenu,
    selectMessageHandlers,
  } = useChatCenterContext();
  const menuRef = useRef<HTMLDivElement>(null);

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

  const handleSelect = () => {
    if (idMessageOpenContextMenu) {
      selectMessageHandlers.selectMessages(idMessageOpenContextMenu);
      setIdMessageOpenContextMenu(null);
    }
    closeContextMenu();
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
      onClose={closeContextMenu}
      shadow
    >
      <MenuItem icon={TiArrowBackOutline} onClick={() => closeContextMenu()}>
        Reply
      </MenuItem>
      <MenuItem icon={TbCopy} onClick={() => closeContextMenu()}>
        Copy
      </MenuItem>
      <MenuItem icon={MdOutlinePushPin} onClick={() => closeContextMenu()}>
        Pin
      </MenuItem>
      <MenuItem icon={TiArrowForwardOutline} onClick={() => closeContextMenu()}>
        Forward
      </MenuItem>
      <MenuItem icon={MdOutlineCheckCircleOutline} onClick={handleSelect}>
        Select
      </MenuItem>
      <MenuItem
        icon={MdOutlineDelete}
        onClick={() => closeContextMenu()}
        style={{ color: "#dc0400" }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
};
