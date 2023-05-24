import { useState, PropsWithChildren } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SettingsModal from "features/Settings";
import { useWindowWidth } from "context/WindowContext";

const MainLayout = ({ children }: PropsWithChildren) => {
  const windowWidth = useWindowWidth();
  const [settingModal, setSettingModal] = useState(false);
  const isSmall = windowWidth < 500;

  const toggleModal = () => {
    setSettingModal(prev => !prev);
  };

  return (
    <div className="mx-auto grid w-fit xs:grid-cols-[4rem_1fr] sm:grid-cols-[5.5rem_minmax(22rem,_38rem)] lg:grid-cols-[5.5rem_minmax(22rem,_38rem)] min-[1200px]:grid-cols-[minmax(5.5rem,_18rem)_minmax(22rem,_38rem)_minmax(5.5rem,_18rem)]">
      {isSmall ? (
        <Navbar settingModal={settingModal} toggleModal={toggleModal} />
      ) : (
        <Sidebar settingModal={settingModal} toggleModal={toggleModal} />
      )}
      <main className="border-r border-light-border dim:border-dim-border dark:border-dark-border">
        {children}
      </main>

      {settingModal && <SettingsModal close={toggleModal} />}
    </div>
  );
};

export default MainLayout;
