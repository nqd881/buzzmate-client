import {ChatApp} from "@components/chat/ChatApp";
import {AppPageWithAppbarLayout} from "@components/shared/AppPageWithAppbarLayout";
import {ChatProvider} from "@contexts/ChatContext";
import {ChatSocketProvider} from "@contexts/ChatSocketContext";
import {NextPageWithLayout} from "@type";

type ChatPageProps = {
  initialData: any;
};

const ChatPage: NextPageWithLayout<ChatPageProps> = () => {
  return (
    <ChatProvider>
      <ChatSocketProvider>
        <ChatApp />
      </ChatSocketProvider>
    </ChatProvider>
  );
};

ChatPage.getLayout = AppPageWithAppbarLayout;

export default ChatPage;
