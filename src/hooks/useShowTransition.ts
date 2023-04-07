import {useEffect, useState} from "react";
import styles from "@styles/opacity-transition.module.scss";
import {sassClasses} from "@utils";

const CLOSE_DURATION = 200;

const cl = sassClasses(styles);

export type ClassNamesOptions = {
  open: string;
  close: string;
};

export const useShowTransition = (
  openState: boolean,
  onCloseTransitionEnd?: () => void
) => {
  const [isOpen, setIsOpen] = useState(!openState);

  useEffect(() => {
    setIsOpen(openState);

    if (!openState) {
      setTimeout(() => {
        if (onCloseTransitionEnd) onCloseTransitionEnd();
      }, CLOSE_DURATION);
    }
  }, [openState, onCloseTransitionEnd]);

  return cl(["opacity-transition", isOpen ? "open" : "close"]);
};
