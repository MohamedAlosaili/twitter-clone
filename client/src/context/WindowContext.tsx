import React, {
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";

const WindowContext = React.createContext<number>(0);

const WindowContextProvider = ({ children }: PropsWithChildren) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const updateWindowWidth = () => setWindowWidth(window.innerWidth);

  return (
    <WindowContext.Provider value={windowWidth}>
      {children}
    </WindowContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useWindowWidth = () => useContext(WindowContext);

export default WindowContextProvider;
