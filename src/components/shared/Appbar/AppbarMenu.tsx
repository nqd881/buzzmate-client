import {Menu, MenuButton, MenuList} from "@chakra-ui/react";
import React from "react";
import {AppbarIconProps} from "./AppbarIcon";

export type AppbarMenuProps = AppbarIconProps & {};

export const AppbarMenu: React.FC<AppbarMenuProps> = (props) => {
  return (
    <Menu>
      <MenuButton />
      <MenuList></MenuList>
    </Menu>
  );
};
