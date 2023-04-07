import {VerticalScrollableView} from "@components/shared/VerticalScrollableView";
import React from "react";
import {sassClasses} from "@utils";
import styles from "./FilesTab.module.scss";
import {SearchGroup} from "./SearchGroup";

const cl = sassClasses(styles);

type FileDetails = {
  id: string;
  name: string;
  size: string;
  created_at: string;
};

const data = [
  {
    title: "June",
    files: [
      {
        id: "1",
        name: "File name",
        size: "1.0 GB",
        created_at: "June 9 at 12:04 AM",
      },
      {
        id: "2",
        name: "File name 2",
        size: "2.0 GB",
        created_at: "June 9 at 12:04 AM",
      },
      {
        id: "3",
        name: "File name 3",
        size: "3.0 GB",
        created_at: "June 11 at 12:04 AM",
      },
      {
        id: "4",
        name: "File name 4",
        size: "1.73MB",
        created_at: "June 24 at 0:04 AM",
      },
      {
        id: "5",
        name: "File name 5",
        size: "1.0 GB",
        created_at: "June 9 at 12:04 AM",
      },
      {
        id: "6",
        name: "File name 6",
        size: "2.0 GB",
        created_at: "June 9 at 12:04 AM",
      },
      {
        id: "7",
        name: "File name 7",
        size: "3.0 MB",
        created_at: "June 11 at 12:04 AM",
      },
      {
        id: "8",
        name: "File name 8",
        size: "1.73MB",
        created_at: "June 24 at 0:04 AM",
      },
    ],
  },
  {
    title: "May",
    files: [
      {
        id: "1",
        name: "File name",
        size: "2.0 GB",
        created_at: "May 19 at 11:04 AM",
      },
    ],
  },
];

type FileItemProps = {
  file: FileDetails;
};

const FileItem: React.FC<FileItemProps> = ({file}) => {
  return (
    <div className={cl("FileItem")}>
      <div className={cl("icon")} />
      <div className={cl("details")}>
        <span className={cl("name")}>{file.name}</span>
        <div className={cl("more")}>
          {file.size} &bull; {file.created_at}
        </div>
      </div>
    </div>
  );
};

export const FilesTab = () => {
  const checkIsLastGroup = (index: number) => index == data.length - 1;

  return (
    <VerticalScrollableView>
      <div className={cl("FilesTab")}>
        {data.map((group, index) => (
          <SearchGroup
            key={group.title}
            title={group.title}
            isLastGroup={checkIsLastGroup(index)}
          >
            {group.files.map((file) => (
              <FileItem key={file.id} file={file} />
            ))}
          </SearchGroup>
        ))}
      </div>
    </VerticalScrollableView>
  );
};
