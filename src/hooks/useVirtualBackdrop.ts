import {RefObject, useEffect} from "react";

export const useVirtualBackdrop = (
  isOpen: boolean,
  menuRef: RefObject<HTMLElement>,
  onClickBackdrop?: () => void | undefined
) => {
  useEffect(() => {
    const handleEvent = (ev: MouseEvent) => {
      const menu = menuRef.current;
      const target = ev.target as HTMLElement | null;

      if (!menu || !target) return;

      if (!menu.contains(target as Node | null)) {
        ev.preventDefault();
        ev.stopPropagation();
        if (onClickBackdrop) onClickBackdrop();
      }
    };

    if (isOpen && onClickBackdrop) {
      document.addEventListener("mousedown", handleEvent);
    }

    return () => {
      document.removeEventListener("mousedown", handleEvent);
    };
  }, [isOpen, menuRef, onClickBackdrop]);
};
