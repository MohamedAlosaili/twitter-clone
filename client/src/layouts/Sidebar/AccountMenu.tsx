import { useState, useRef } from "react";
import { FiLogOut } from "react-icons/fi";

import Dropdown from "components/Dropdown";
import Avatar from "components/Avatar";
import { useUser } from "context/UserContent";

const AccountMenu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const { user, logOut } = useUser();

  return (
    <>
      <Dropdown
        isOpen={showDropdown}
        close={() => setShowDropdown(false)}
        parentRef={parentRef}
        buttons={[
          {
            onClick: logOut,
            children: (
              <>
                <FiLogOut size={25} />
                Log out @{user?.username}
              </>
            ),
          },
        ]}
        addArrow={true}
      />
      <div
        onClick={() => setShowDropdown(true)}
        ref={parentRef}
        className={`mx-auto flex cursor-pointer items-center gap-4 self-start rounded-full p-2 transition-colors hover:bg-light-hover dim:hover:bg-dim-hover dark:hover:bg-dark-hover xl:mx-0 xl:w-full xl:p-3 xl:py-2`}
      >
        <Avatar
          avatarUrl={user?.avatar as string}
          username={user?.username as string}
          className="w-10"
          layer={false}
        />
        <div className="hidden xl:block">
          <h3 className="font-bold">{user?.name}</h3>
          <p className="text-light-text-2 dim:text-dim-text-2 dark:text-dark-text-2">
            @{user?.username}
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountMenu;
