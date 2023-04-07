import {BiTask} from "react-icons/bi";
import {BsCameraVideo} from "react-icons/bs";
import {
  IoChatbubblesOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import {AppbarLinkIconProps} from "./AppbarLinkIcon";

export const links: AppbarLinkIconProps[] = [
  {
    href: "/apps/home",
    icon: IoHomeOutline,
  },
  {
    href: "/apps/chat",
    icon: IoChatbubblesOutline,
  },
  {
    href: "/apps/task",
    icon: BiTask,
  },
  {
    href: "/apps/meet",
    icon: BsCameraVideo,
  },
  {
    href: "/apps/setting",
    icon: IoSettingsOutline,
  },
];
