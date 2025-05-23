import React, { useMemo, useState } from "react";

interface IProps {
  header: boolean;
  footer: boolean;
  setHeader: (header: boolean) => void;
  setFooter: (footer: boolean) => void;
}

export const LayoutContext = React.createContext<IProps>({} as IProps);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [header, setHeader] = useState<boolean>(true);
  const [footer, setFooter] = useState<boolean>(true);

  const value: IProps = useMemo(() => {
    return {
      footer,
      header,
      setFooter,
      setHeader,
    };
  }, [footer, header]);

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => React.useContext(LayoutContext);