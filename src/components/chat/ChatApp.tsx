import {ChatCenterContextProvider} from "@contexts/ChatCenterContext";
import {useChatCtx} from "@contexts/ChatContext";
import {sassClasses} from "@utils";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {Suspense, useEffect, useState} from "react";
import {ChatCenter} from "./center/ChatCenter";
import styles from "./ChatApp.module.scss";
import {ChatLeft} from "./left/ChatLeft";
import {ChatRight} from "./right/ChatRight";
import io from "socket.io-client";

const DynamicCenter = dynamic(() => import("./center/ChatCenter"), {
  loading: () => {
    return <div>Loading ...</div>;
  },
});
const DynamicRight = dynamic(() => import("./right/ChatRight"));

const cl = sassClasses(styles);

export const ChatApp = () => {
  const router = useRouter();
  const {chatAppRef} = useChatCtx();

  // const me = useMe();

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prevOpen) => !prevOpen);

  return (
    <div ref={chatAppRef} className={cl("ChatApp")}>
      <ChatLeft doSomething={toggle} />
      {/* <ChatCenterContextProvider>
        <ChatCenter />
      </ChatCenterContextProvider>
      <ChatRight /> */}
      {/* {open ? ( */}
      {/* <Suspense fallback={"Loading ChatCenter component ..."}> */}
      <ChatCenterContextProvider>
        <DynamicCenter />
      </ChatCenterContextProvider>
      {/* </Suspense> */}
      {/* ) : null} */}
      <Suspense fallback={"Loading ChatRight component ..."}>
        <ChatCenterContextProvider>
          <DynamicRight />
        </ChatCenterContextProvider>
      </Suspense>
    </div>
  );
};
