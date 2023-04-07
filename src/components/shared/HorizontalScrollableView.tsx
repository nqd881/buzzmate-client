import React, {PropsWithChildren, useEffect} from "react";
import {sassClasses} from "@utils";
import styles from "./HorizontalScrollableView.module.scss";

const cl = sassClasses(styles);

export type HorizontalScrollableViewProps = {
  hidden?: boolean;
  scrollHorizontally?: boolean;
};
export const HorizontalScrollableView: React.FC<
  PropsWithChildren<HorizontalScrollableViewProps>
> = ({children, hidden, scrollHorizontally}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollHorizontally) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheelEvent = (ev: WheelEvent) => {
      ev.preventDefault();
      scrollContainer.scrollLeft += ev.deltaY;
    };

    scrollContainer.addEventListener("wheel", handleWheelEvent);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheelEvent);
    };
  }, [scrollContainerRef, scrollHorizontally]);

  return (
    <div
      ref={scrollContainerRef}
      className={cl(["HorizontalScrollableView", hidden ? "hidden" : ""])}
    >
      {children}
    </div>
  );
};
