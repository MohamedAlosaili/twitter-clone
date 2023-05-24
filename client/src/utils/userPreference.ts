export const getUserPrefer = () => {
  const theme = getStoredPrefer();

  if (theme?.mode) return applyUserPrefer(theme);

  theme.accent = "blue";

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme.mode = "dim";
  } else {
    theme.mode = "light";
  }

  storeUserPrefer(theme);
};

export const getStoredPrefer = () => {
  const theme = JSON.parse(localStorage.getItem("userPrefer") ?? "{}");

  return theme;
};

export interface Theme {
  mode: "dark" | "light" | "dim";
  accent: "blue" | "yellow" | "pink" | "purple" | "orange" | "green";
}

export const storeUserPrefer = (theme: Theme) => {
  localStorage.setItem("userPrefer", JSON.stringify(theme));
  applyUserPrefer(theme);
};

const applyUserPrefer = (theme: Theme) => {
  document.documentElement.className = theme.mode;
  document.documentElement.setAttribute("accent-color", theme.accent);
};
