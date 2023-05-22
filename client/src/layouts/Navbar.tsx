import {
  RiHome7Line,
  RiHome7Fill,
  RiSearchLine,
  RiSearchFill,
} from "react-icons/ri";
import { HiOutlineBell, HiOutlineMail } from "react-icons/hi";

import NavLink from "components/NavLink";

const Navbar = () => {
  return (
    <nav className="dark:border-dark-border fixed bottom-0 left-0 z-10 flex h-14 w-full items-center justify-evenly border-t border-light-border text-light-text dim:border-dim-border dim:text-dim-text dark:text-dark-text xs:hidden">
      <NavLink to="/home">
        {active =>
          active ? <RiHome7Fill size={24} /> : <RiHome7Line size={24} />
        }
      </NavLink>
      <NavLink to="/explore">
        {active =>
          active ? <RiSearchFill size={24} /> : <RiSearchLine size={24} />
        }
      </NavLink>
      <NavLink to="#" className="cursor-not-allowed">
        <HiOutlineBell size={24} />
      </NavLink>
      <NavLink to="#" className="cursor-not-allowed">
        <HiOutlineMail size={24} />
      </NavLink>
    </nav>
  );
};

export default Navbar;
