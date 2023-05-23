import { RefObject, useState, ReactNode, lazy, Suspense } from "react";

import Backdrop from "components/Backdrop";
import Portal from "components/Portal";
import { useWindowWidth } from "context/WindowContext";
import { ModalProps } from "components/types";

const DynamicDropdown = lazy(() => import("./DynamicDropdown"));

interface Props extends ModalProps {
  buttons: Array<{ children: ReactNode; onClick?: () => void }>;
  parentRef?: RefObject<HTMLDivElement>;
  position?: "left" | "center" | "right";
  addArrow?: boolean;
}

export interface PositionType {
  menu: {
    top?: string;
    left?: string;
    right?: string;
  };
  arrow: {
    top?: string;
    left?: string;
    dir?: string;
  };
}

const Dropdown = ({
  isOpen,
  close,
  className,
  parentRef,
  position = "center",
  buttons,
  addArrow,
}: Props) => {
  const windowWidth = useWindowWidth();
  const [pos, setPos] = useState<PositionType>();

  const smallDevices = windowWidth < 500;

  return (
    <>
      {isOpen && (
        <Portal id="dropdown">
          <Backdrop onClick={close} transparent={!smallDevices} />
          <Suspense>
            {!smallDevices && parentRef && (
              <DynamicDropdown
                setPos={setPos}
                buttonsCount={buttons.length}
                parentRef={parentRef}
                windowWidth={windowWidth}
                position={position}
              />
            )}
          </Suspense>
          <div
            style={smallDevices ? {} : pos?.menu}
            className={`absolute z-40 ${
              smallDevices
                ? "bottom-0 left-0 w-full rounded-tl-2xl rounded-tr-2xl"
                : "w-72 rounded-xl"
            } bg-light py-4 shadow-light-sh dim:bg-dim dim:shadow-dim-sh dark:bg-dark dark:shadow-dark-sh`}
          >
            <div className={`${className}`}>
              {buttons.map((btn, idx) => (
                <button
                  key={idx}
                  className="flex w-full items-center gap-4 px-4 py-3 text-left font-bold transition-colors hover:bg-light-2 dim:hover:bg-dim-2 dark:hover:bg-dark-2"
                  onClick={btn?.onClick ?? undefined}
                >
                  {btn.children}
                </button>
              ))}
            </div>
            {smallDevices && (
              <button
                onClick={close}
                className="mx-auto mt-4 block h-11 w-[calc(100%-2rem)] rounded-full border border-light-border-2 font-bold transition-colors active:bg-light-3 dim:border-dim-border-2 dim:active:bg-dim-3 dark:border-dark-border-2 dark:active:bg-dark-3"
              >
                Cancel
              </button>
            )}
          </div>
          {addArrow && !smallDevices && (
            <div
              className="absolute top-full z-40 h-[10px] w-4 bg-light shadow-light-sh dim:bg-dim dim:shadow-dim-sh dark:bg-dark dark:shadow-dark-sh"
              style={{
                clipPath:
                  pos?.arrow.dir === "top"
                    ? "polygon(50% 0, 100% 100%, 0 100%"
                    : "polygon(0 0, 100% 0, 50% 100%",
                top: pos?.arrow.top,
                left: pos?.arrow.left,
              }}
            ></div>
          )}
        </Portal>
      )}
    </>
  );
};

export default Dropdown;
