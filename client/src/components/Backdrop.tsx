import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  onClick: () => void;
  transparent?: boolean;
}

const Backdrop = ({ onClick, children, transparent = false }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 z-40 ${
        transparent
          ? "bg-transparent"
          : "bg-light-hover-2/20 dim:bg-dim-hover/10 dark:bg-dark-hover/20"
      }`}
    >
      <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Backdrop;
