import { Link } from "react-router-dom";
import { BsTwitter } from "react-icons/bs";
import {
  RiHome7Line,
  RiHome7Fill,
  RiSearchLine,
  RiSearchFill,
} from "react-icons/ri";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";

import NavLink from "components/NavLink";
import AccountMenu from "./AccountMenu";
import { useUser } from "context/UserContent";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="ml-auto hidden h-screen w-full flex-col items-center justify-between gap-4 overflow-y-auto border-r border-light-border px-2 py-4 dim:border-dim-border dark:border-dark-border xs:flex xs:max-w-[5.5rem] xl:max-w-[18rem]">
      <div className="flex w-full flex-col items-center gap-2 xl:items-start">
        <NavLink to="/home">
          <BsTwitter size={24} className="text-accent" />
        </NavLink>
        <NavLink to="/explore" className="order-2" text="Explore">
          {active =>
            active ? <RiSearchFill size={26} /> : <RiSearchLine size={26} />
          }
        </NavLink>
        <NavLink to={`/settings`} text="Settings" className="order-7">
          {active =>
            active ? (
              <IoSettingsSharp size={26} />
            ) : (
              <IoSettingsOutline size={26} />
            )
          }
        </NavLink>
        {user && (
          <>
            <NavLink to="/home" className="order-1" text="Home">
              {active =>
                active ? <RiHome7Fill size={26} /> : <RiHome7Line size={26} />
              }
            </NavLink>
            <NavLink
              to={`/${user.username ?? ""}`}
              className="order-6"
              text="Profile"
            >
              {active =>
                active ? <HiUser size={26} /> : <HiOutlineUser size={26} />
              }
            </NavLink>
            <Link
              to="/compose/tweet"
              className="order-last rounded-full bg-accent p-3 text-center transition-colors hover:bg-accent/80 xl:w-64 xl:px-4"
            >
              <AiOutlinePlus size={25} className="stroke-[25px] xl:hidden" />
              <span className="hidden text-lg font-medium xl:block">Tweet</span>
            </Link>
          </>
        )}
      </div>
      {user && <AccountMenu />}
    </aside>
  );
};

export default Sidebar;
