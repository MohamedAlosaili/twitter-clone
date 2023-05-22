import { useState, useLayoutEffect, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type Props = PropsWithChildren<{ id: "modal" | "dropdown" }>;

const Portal = ({ children, id }: Props) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = document.getElementById(id);

    if (!root) {
      createAndAppendModalRoot(id);
    }

    setModalRoot(root);

    // Why I don't clean up on unmount? 👇
    // Roots will be two types modal and dropdown
    // No need to remove the root when the portal is unmounted, because it will be used by another component
  }, [id]);

  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
};

const createAndAppendModalRoot = (id: string) => {
  const div = document.createElement("div");
  div.id = id;

  document.body.appendChild(div);
};

export default Portal;
