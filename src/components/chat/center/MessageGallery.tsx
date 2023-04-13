import { sassClasses } from "@utils";
import Image from "next/image";
import React, { PropsWithChildren } from "react";
import { Photo, Video } from "src/models";
import styles from "./MessageGallery.module.scss";

const cl = sassClasses(styles);

const MessageGalleryItemWrapper: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return <div className={cl("MessageGalleryItem")}>{children}</div>;
};

const MessageGalleryPhoto: React.FC<any> = (props: { photo: Photo }) => {
  const { photo } = props;

  const handleClick = () => {
    console.log("Click click");
  };

  return (
    <Image
      className={cl("MessageGalleryPhoto")}
      alt=""
      key={photo.id}
      fill
      sizes="100%"
      src={
        Boolean(photo.localUri)
          ? photo.localUri
          : Boolean(photo.remoteUri)
          ? `${photo.remoteUri}?t=${new Date().getTime()}`
          : ""
      }
      onClick={handleClick}
    />
  );
};

const MessageGalleryVideo: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <video
      className={cl("MessageGalleryVideo")}
      key={video.id}
      src={video.uri}
      controls
    />
  );
};

export const MessageGallery = React.memo(function MessageGallery(props: {
  photos?: Photo[];
  videos?: Video[];
  direction?: "ltr" | "rtl";
}) {
  const { photos, videos, direction } = props;

  return (
    <div className={cl(["MessageGallery", direction])}>
      {photos?.map((photo) => (
        <MessageGalleryItemWrapper key={`Photo_${photo.id}`}>
          <MessageGalleryPhoto photo={photo} />
        </MessageGalleryItemWrapper>
      ))}
      {videos?.map((video) => (
        <MessageGalleryItemWrapper key={`Video_${video.id}`}>
          <MessageGalleryVideo video={video} />
        </MessageGalleryItemWrapper>
      ))}
    </div>
  );
});
