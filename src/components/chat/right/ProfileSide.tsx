import {sassClasses} from "@utils";
import {ProfileHeader} from "./ProfileHeader";
import styles from "./ProfileSide.module.scss";
import {SearchSuper} from "./SearchSuper/SearchSuper";

const cl = sassClasses(styles);

export const ProfileSide = () => {
  return (
    <div className={cl("ProfileSide")}>
      <ProfileHeader />
      <SearchSuper />
    </div>
  );
};
