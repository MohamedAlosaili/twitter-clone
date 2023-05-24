import {
  RiHome7Line,
  RiHome7Fill,
  RiSearchLine,
  RiSearchFill,
} from "react-icons/ri";
import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";

import NavLink from "components/NavLink";
import Avatar from "components/Avatar";
import { useUser } from "context/UserContent";
import { ModalProps } from "./types";

const Navbar = ({ settingModal, toggleModal }: ModalProps) => {
  const { user } = useUser();

  return (
    <nav className="fixed bottom-0 left-0 z-10 flex h-14 w-full items-center justify-evenly border-t border-light-border bg-light text-light-text dim:border-dim-border dim:bg-dim dim:text-dim-text dark:border-dark-border dark:bg-dark dark:text-dark-text xs:hidden">
      <NavLink to="/home">
        {active =>
          active ? (
            <RiHome7Fill size={24} className="text-accent" />
          ) : (
            <RiHome7Line size={24} />
          )
        }
      </NavLink>
      <NavLink to="/explore">
        {active =>
          active ? (
            <RiSearchFill size={24} className="text-accent" />
          ) : (
            <RiSearchLine size={24} />
          )
        }
      </NavLink>
      {user && (
        <NavLink to={`/${user.username}`} className="group relative !p-0">
          {active => (
            <>
              <div
                className={`light "group-hover:bg-light-hover dark:group-hover:bg-dark-hover" absolute -inset-[0.55rem] rounded-full transition-colors dim:group-hover:bg-dim-hover`}
              ></div>
              <div
                className={`absolute -inset-1 rounded-full border-2 ${
                  active ? "border-accent" : "border-transparent"
                }`}
              ></div>
              <Avatar
                avatarUrl={user.avatar}
                username={user.name}
                className="w-8"
                layer={false}
              />
            </>
          )}
        </NavLink>
      )}
      <NavLink to={`#`}>
        {settingModal ? (
          <IoSettingsSharp size={26} className="text-accent" />
        ) : (
          <IoSettingsOutline size={26} onClick={toggleModal} />
        )}
      </NavLink>
    </nav>
  );
};

export default Navbar;
