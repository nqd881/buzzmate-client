import { VerticalScrollableView } from "@components/shared/VerticalScrollableView";
import Image from "next/image";
import React from "react";
import { sassClasses } from "@utils";
import styles from "./MediaTab.module.scss";

const cl = sassClasses(styles);

enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

type MediaDetails = {
  id: string;
  url: string;
  type: MediaType;
  time?: string;
};

const data: MediaDetails[] = [
  {
    id: "1",
    url: "https://wallpaperaccess.com/full/228227.jpg",
    type: MediaType.VIDEO,
    time: "1:01",
  },
  {
    id: "2",
    url: "https://wallpaperaccess.com/full/858869.jpg",
    type: MediaType.IMAGE,
  },
  {
    id: "3",
    url: "https://wallpaperaccess.com/full/2121737.jpg",
    type: MediaType.IMAGE,
  },
  {
    id: "4",
    url: "https://wallpaperaccess.com/full/878503.jpg",
    type: MediaType.IMAGE,
  },
  {
    id: "5",
    url: "https://wallpaperaccess.com/full/878503.jpg",
    type: MediaType.VIDEO,
    time: "21:04",
  },
];

type MediaItemProps = {
  data: MediaDetails;
};

type MediaImageProps = MediaItemProps;

const MediaImage: React.FC<MediaImageProps> = ({ data }) => {
  return (
    <Image
      className={cl("MediaImage")}
      layout="fill"
      src={data.url}
      alt="media-image"
    />
  );
};

type MediaVideoProps = MediaItemProps;

const MediaVideo: React.FC<MediaVideoProps> = ({ data }) => {
  return (
    <div className={cl("MediaVideo")}>
      <Image
        className={cl("video-thumbnail")}
        layout="fill"
        src={data.url}
        alt="media-video"
      />
      <span className={cl("video-time")}>{data.time}</span>
    </div>
  );
};

const MediaItem: React.FC<MediaItemProps> = ({ data }) => {
  const renderMediaContent = () => {
    switch (data.type) {
      case MediaType.IMAGE:
        return <MediaImage data={data} />;
      case MediaType.VIDEO:
        return <MediaVideo data={data} />;
    }
  };

  return <div className={cl("MediaItem")}>{renderMediaContent()}</div>;
};

export const MediaTab = () => {
  const items = data.map((mediaItem) => (
    <MediaItem key={mediaItem.id} data={mediaItem} />
  ));

  return (
    <VerticalScrollableView>
      <div className={cl("MediaTab")}>{items}</div>
    </VerticalScrollableView>
  );
};
