import { ReactNode } from "react";

interface BackdropPropType {
  onClick: () => void;
  children: ReactNode;
  transparent?: boolean;
}

const Backdrop = ({
  onClick,
  children,
  transparent = false,
}: BackdropPropType) => {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 z-50 ${
        transparent
          ? "bg-transparent"
          : "bg-light-hover-2/10 dim:bg-dim-hover-2/10 dark:bg-dark-hover-2/10"
      }`}
    >
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Backdrop;
