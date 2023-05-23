import { useLayoutEffect, RefObject } from "react";

import { PositionType } from "./";

interface Props {
  setPos: (pos: PositionType) => void;
  windowWidth: number;
  parentRef: RefObject<HTMLDivElement>;
  buttonsCount: number;
  position: "left" | "center" | "right";
}

const DynamicDropdown = ({
  setPos,
  parentRef,
  windowWidth,
  buttonsCount,
  position,
}: Props) => {
  useLayoutEffect(() => {
    const parent = parentRef.current;
    if (parent) calculatePosition(parent);
  }, [windowWidth]);

  const calculatePosition = (parent: HTMLDivElement) => {
    const parentRect = parent.getBoundingClientRect();
    const menuHeight = 32 + 48 * buttonsCount; // Padding + (btnHeight * buttonsCount);
    const menuWidth = 288;

    const documentHeight = window.scrollY;
    const viewHeight = window.innerHeight;
    const menu: PositionType["menu"] = {};
    const arrow: PositionType["arrow"] = {
      left: `${parentRect.left + parentRect.width / 2 - 8}px`,
    };

    if (menuHeight + 16 > viewHeight - parentRect.bottom) {
      menu.top = `${parentRect.top - 16 - menuHeight + documentHeight}px`;
      arrow.top = `${parentRect.top - 16 + documentHeight}px`;
      arrow.dir = "bottom";
    } else {
      menu.top = `${parentRect.bottom + 16 + documentHeight}px`;
      arrow.top = `${parentRect.bottom + 6 + documentHeight}px`;
      arrow.dir = "top";
    }

    if (position === "left" || position === "right") {
      const extraSpace =
        (16 + parentRect.height) * (arrow.dir === "bottom" ? 1 : -1);
      console.log(parentRect.height, extraSpace);
      menu.top = `${parseInt(menu.top) + extraSpace}px`;
    }

    if (position === "center") {
      if (menuWidth / 2 > parentRect.left) {
        menu.left = `16px`;
      } else {
        menu.left = `${
          parentRect.width / 2 - menuWidth / 2 + parentRect.left
        }px`;
      }
    } else {
      menu[position] = `${parentRect[position]}px`;
    }

    setPos({ menu, arrow });
  };

  return null;
};

export default DynamicDropdown;
