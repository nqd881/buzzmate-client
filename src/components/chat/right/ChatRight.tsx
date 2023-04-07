import {ChatRightSide, useChatCtx} from "@contexts/ChatContext";
import {sassClasses} from "@utils/buildClassName";
import styles from "./ChatRight.module.scss";
import {ProfileSide} from "./ProfileSide";
import {SearchSide} from "./SearchSide";

const cl = sassClasses(styles);

export const ChatRight = () => {
  const {openRightSide, rightSide} = useChatCtx();

  const renderSide = () => {
    switch (rightSide) {
      case ChatRightSide.PROFILE:
        return <ProfileSide />;
      case ChatRightSide.SEARCH:
        return <SearchSide />;
    }
  };

  return (
    <div className={cl(["ChatRight", openRightSide ? "" : "collapsed"])}>
      {renderSide()}
    </div>
  );
};

export default ChatRight;
