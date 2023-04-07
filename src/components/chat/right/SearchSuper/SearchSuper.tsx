import {Button} from "@components/custom/Button";
import {HorizontalScrollableView} from "@components/shared/HorizontalScrollableView";
import React, {useState} from "react";
import {sassClasses} from "@utils";
import {FilesTab} from "./FilesTab";
import {LinksTab} from "./LinksTab";
import {MediaTab} from "./MediaTab";
import {MembersTab} from "./MembersTab";
import styles from "./SearchSuper.module.scss";
import {VoiceTab} from "./VoiceTab";

const cl = sassClasses(styles);

enum SearchTabs {
  MEMBERS = "Members",
  MEDIA = "Media",
  FILES = "Files",
  LINKS = "Links",
  VOICE = "Voice",
}

type TabDescription = {
  tabName: SearchTabs;
  content: () => JSX.Element;
};

const tabs: TabDescription[] = [
  {tabName: SearchTabs.MEMBERS, content: MembersTab},
  {tabName: SearchTabs.MEDIA, content: MediaTab},
  {tabName: SearchTabs.FILES, content: FilesTab},
  {tabName: SearchTabs.LINKS, content: LinksTab},
  {tabName: SearchTabs.VOICE, content: VoiceTab},
];

type TabMenuProps = {
  currentTab: SearchTabs;
  setCurrentTab: (...args: any[]) => any;
};

type TabItemProps = TabMenuProps & {tab: TabDescription};

const TabItem: React.FC<TabItemProps> = ({currentTab, setCurrentTab, tab}) => {
  const className = cl([
    "tab-item",
    tab.tabName == currentTab ? "tab-current-item" : "",
  ]);

  return (
    <div key={tab.tabName} className={className}>
      <Button
        className={cl("tab-name")}
        rippleEffect
        onClick={() => setCurrentTab(tab.tabName)}
      >
        {tab.tabName}
      </Button>
    </div>
  );
};

const TabMenu: React.FC<TabMenuProps> = (props) => {
  const menuItems = tabs.map((tab) => (
    <TabItem key={tab.tabName} {...props} tab={tab} />
  ));

  return (
    <div className={cl("tab-menu")}>
      <HorizontalScrollableView scrollHorizontally hidden>
        <div className={cl("tabs")}>{menuItems}</div>
      </HorizontalScrollableView>
    </div>
  );
};

type TabContentProps = {
  currentTab: SearchTabs;
};

const TabContent: React.FC<TabContentProps> = ({currentTab}) => {
  const Tab = tabs.find((tab) => tab.tabName == currentTab)?.content;

  return <div className={cl("tab-content")}>{Tab && <Tab />}</div>;
};

export const SearchSuper = () => {
  const [currentTab, setCurrentTab] = useState(SearchTabs.MEMBERS);

  return (
    <div className={cl("SearchSuper")}>
      <TabMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <TabContent currentTab={currentTab} />
    </div>
  );
};
