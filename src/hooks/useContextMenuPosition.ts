import {CSSProperties, useEffect, useState} from "react";
import {VPP} from "@utils";

const {max, min} = Math;

// Return caculated position of menu relative to trigger element inside root.
// Note: Calculate base on rootRef as origin
export const useContextMenuPosition = (
  anchor: VPP | undefined,
  getRoot: () => HTMLElement | null,
  getMenu: () => HTMLElement | null,
  paddingX = 0,
  paddingY = 0
) => {
  const [menuPosition, setMenuPosition] = useState(new VPP(0, 0));
  const [style, setStyle] = useState<CSSProperties>({});

  const createStyle = (x: number, y: number) => {
    return {
      left: `${x}px`,
      top: `${y}px`,
    };
  };

  useEffect(() => {
    let posX = 0,
      posY = 0;

    const root = getRoot();
    const menu = getMenu();

    if (!anchor || !root || !menu) return;

    const rootRect = root.getBoundingClientRect();
    const menuRect = {width: menu.offsetWidth, height: menu.offsetHeight};

    const anchorToRoot = anchor.convertOrigin(root);

    const AX = max(0, rootRect.width - menuRect.width);
    const AY = max(0, rootRect.height - menuRect.height);

    const newPaddingX = paddingX >= 0 ? min(paddingX, AX / 2) : 0;
    const newPaddingY = paddingY >= 0 ? min(paddingY, AY / 2) : 0;

    const minX = min(newPaddingX, AX - newPaddingX);
    const maxX = max(newPaddingX, AX - newPaddingX);

    const minY = min(newPaddingY, AY - newPaddingY);
    const maxY = max(newPaddingY, AY - newPaddingY);

    posX = min(max(anchorToRoot.value.x, minX), maxX);
    posY = min(max(anchorToRoot.value.y, minY), maxY);

    const newStyle = createStyle(posX, posY);

    setStyle(newStyle);
    setMenuPosition(new VPP(posX, posY, root));
  }, [anchor, getRoot, getMenu, paddingX, paddingY]);

  return {menuPosition, style};
};
