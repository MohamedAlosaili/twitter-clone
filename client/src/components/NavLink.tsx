import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavLinkProp {
  to: string;
  children: ReactNode | ((isActive: boolean) => ReactNode);
  text?: string;
  className?: string;
}

const NavLink = ({ to, children, text, className }: NavLinkProp) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(() => location.pathname === to);

  useEffect(() => {
    setIsActive(location.pathname === to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Link
      to={to}
      className={`flex gap-4 rounded-full p-3 transition-colors hover:bg-light-hover dim:hover:bg-dim-hover dark:hover:bg-dark-hover ${className}`}
    >
      {typeof children === "function" ? children(isActive) : children}
      {text && (
        <div
          className={`mr-4 hidden text-xl ${
            isActive ? "font-bold" : "font-medium"
          } xl:block`}
        >
          {text}
        </div>
      )}
    </Link>
  );
};

export default NavLink;
