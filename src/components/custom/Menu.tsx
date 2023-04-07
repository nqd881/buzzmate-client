import {useShowTransition, useVirtualBackdrop} from "@hooks";
import React, {
  ComponentProps,
  CSSProperties,
  PropsWithChildren,
  RefObject,
  useRef,
} from "react";
import {isNumber, sassClasses} from "@utils";
import styles from "./Menu.module.scss";

const cl = sassClasses(styles);

export type MenuProps = ComponentProps<"div"> & {
  isOpen: boolean;
  menuRef?: RefObject<HTMLDivElement>;
  className?: string;
  style?: CSSProperties;
  positionX?: "left" | "right" | number;
  positionY?: "top" | "bottom" | number;
  shadow?: boolean;
  onCloseTransitionEnd?: () => void;
  onClose?: () => void;
};

export const Menu: React.FC<PropsWithChildren<MenuProps>> = ({
  isOpen,
  menuRef,
  className,
  style,
  positionX = "left",
  positionY = "top",
  shadow,
  onCloseTransitionEnd,
  onClose,
  children,
  ...otherProps
}) => {
  let ref = useRef<HTMLDivElement>(null);
  if (menuRef) ref = menuRef;

  const transitionClassName = useShowTransition(isOpen, onCloseTransitionEnd);
  useVirtualBackdrop(isOpen, ref, onClose);

  const convertPos = (pos: string | number) =>
    isNumber(pos) ? `${pos}px` : pos;

  const fullStyle = Object.assign({}, style, {
    transformOrigin: `${convertPos(positionX)} ${convertPos(positionY)}`,
  });

  const fullClassName = cl(
    ["Menu", shadow ? "shadow" : ""],
    [className, transitionClassName]
  );

  return (
    <div ref={ref} className={fullClassName} style={fullStyle} {...otherProps}>
      {children}
    </div>
  );
};
