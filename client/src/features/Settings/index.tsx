import { useState } from "react";

import Color from "./Color";
import Modal, { ModalProps } from "components/Modal";
import { Theme, getStoredPrefer, storeUserPrefer } from "utils/userPreference";
import BackgroundColor from "./BackgroundColor";

const accent = {
  blue: "rgb(29, 155, 240)",
  yellow: "rgb(255, 212, 0)",
  pink: "rgb(249, 24, 128)",
  purple: "rgb(120, 86, 255)",
  orange: "rgb(255, 122, 0)",
  green: "rgb(0, 186, 124)",
};

const SettingsModal = ({ close }: ModalProps) => {
  const [theme, setTheme] = useState<Theme>(() => getStoredPrefer());

  const changeColor = (colorName: Theme["accent"]) => {
    setTheme(prev => ({ ...prev, accent: colorName }));
    storeUserPrefer({ ...theme, accent: colorName });
  };

  const changeBgColor = (mode: Theme["mode"]) => {
    setTheme(prev => ({ ...prev, mode }));
    storeUserPrefer({ ...theme, mode });
  };

  return (
    <Modal close={close}>
      <div className="flex w-full flex-col gap-4 sm:w-min">
        <h2 className="text-center text-xl font-semibold">
          Customize your view
        </h2>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-light-text-2 dim:text-dim-text-2 dark:text-dark-text-2">
            Color
          </h3>
          <div className="flex flex-wrap justify-center gap-y-4 rounded-2xl bg-light-2 p-3 dim:bg-dim-2 dark:bg-dark-2 sm:flex-nowrap">
            <Color
              color={accent["blue"]}
              selected={theme.accent === "blue"}
              colorName="blue"
              changeColor={changeColor}
            />
            <Color
              color={accent["yellow"]}
              selected={theme.accent === "yellow"}
              colorName="yellow"
              changeColor={changeColor}
            />
            <Color
              color={accent["pink"]}
              selected={theme.accent === "pink"}
              colorName="pink"
              changeColor={changeColor}
            />
            <Color
              color={accent["purple"]}
              selected={theme.accent === "purple"}
              colorName="purple"
              changeColor={changeColor}
            />
            <Color
              color={accent["orange"]}
              selected={theme.accent === "orange"}
              colorName="orange"
              changeColor={changeColor}
            />
            <Color
              color={accent["green"]}
              selected={theme.accent === "green"}
              colorName="green"
              changeColor={changeColor}
            />
          </div>
        </div>
        <div className="w-full">
          <h3 className="mb-2 text-sm font-semibold text-light-text-2 dim:text-dim-text-2 dark:text-dark-text-2">
            Background
          </h3>
          <div className="flex w-full flex-col gap-4 rounded-2xl bg-light-2 p-3 dim:bg-dim-2 dark:bg-dark-2 sm:flex-row">
            <BackgroundColor
              color="light"
              selected={theme.mode === "light"}
              changeBgColor={changeBgColor}
            />
            <BackgroundColor
              color="dim"
              selected={theme.mode === "dim"}
              changeBgColor={changeBgColor}
            />
            <BackgroundColor
              color="dark"
              selected={theme.mode === "dark"}
              changeBgColor={changeBgColor}
            />
          </div>
        </div>
        <button
          className="mx-auto hidden w-fit rounded-full bg-accent px-4 py-2 font-semibold text-white transition-colors hover:bg-accent/80 sm:block"
          onClick={close}
        >
          Done
        </button>
      </div>
    </Modal>
  );
};

export default SettingsModal;
