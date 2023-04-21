import { ChatCenterContextProvider } from "@contexts/ChatCenterContext";
import { useChatCtx } from "@contexts/ChatContext";
import { sassClasses } from "@utils";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import styles from "./ChatApp.module.scss";
import { ChatLeft } from "./left/ChatLeft";

const DynamicCenter = dynamic(() => import("./center/ChatCenter"), {
  loading: () => {
    return <div>Loading ...</div>;
  },
});
const DynamicRight = dynamic(() => import("./right/ChatRight"));

const cl = sassClasses(styles);

export const ChatApp = () => {
  const { chatAppRef } = useChatCtx();

  return (
    <div ref={chatAppRef} className={cl("ChatApp")}>
      <ChatLeft />
      <ChatCenterContextProvider>
        <DynamicCenter />
      </ChatCenterContextProvider>
      <Suspense fallback={"Loading ChatRight component ..."}>
        <ChatCenterContextProvider>
          <DynamicRight />
        </ChatCenterContextProvider>
      </Suspense>
    </div>
  );
};
