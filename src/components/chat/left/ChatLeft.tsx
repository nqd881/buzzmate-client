import {useChats} from "@hooks/api/useChats";
import {sassClasses} from "@utils";
import {MouseEvent} from "react";
import styles from "./ChatLeft.module.scss";
import {ChatList} from "./ChatList";
import {LeftHeader} from "./LeftHeader";
import {Search} from "./Search";

const cl = sassClasses(styles);

export const ChatLeft = ({doSomething}) => {
  return (
    <div className={cl("ChatLeft")}>
      <LeftHeader />
      <Search />
      <ChatList />
    </div>
  );
};
