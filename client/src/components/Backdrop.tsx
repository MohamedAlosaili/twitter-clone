import { ReactNode } from "react";

interface BackdropPropType {
  onClick: () => void;
  children: ReactNode;
}

const Backdrop = ({ onClick, children }: BackdropPropType) => {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-50 bg-light-hover-2/10 dim:bg-dim-hover-2/10 dark:bg-dark-hover-2/10"
    >
      {children}
    </div>
  );
};

export default Backdrop;
