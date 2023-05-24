import { PropsWithChildren } from "react";
import { CgClose } from "react-icons/cg";

import Portal from "./Portal";
import Backdrop from "./Backdrop";

export interface ModalProps extends PropsWithChildren {
  close: () => void;
  className?: string;
}

const Modal = ({ children, close, className }: ModalProps) => {
  return (
    <Portal id="modal">
      <Backdrop onClick={close}>
        <div
          className={`absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-auto bg-light p-4 text-inherit dim:bg-dim dark:bg-dark sm:h-auto sm:max-h-[90vh] sm:w-auto sm:max-w-[90vw] sm:rounded-2xl`}
        >
          <button onClick={close} className="absolute left-4 top-4 sm:hidden">
            <CgClose size={25} />
          </button>
          <div className={`flex justify-center ${className}`}>{children}</div>
        </div>
      </Backdrop>
    </Portal>
  );
};

export default Modal;
