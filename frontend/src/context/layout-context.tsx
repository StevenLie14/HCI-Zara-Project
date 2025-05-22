// import React, { useMemo, useState } from "react";
// import LoadingScreen from "@/components/loading-screen.tsx";
//
// interface IProps {
//   // header: boolean;
//   // footer: boolean;
//   // setHeader: (header: boolean) => void;
//   // setFooter: (footer: boolean) => void;
//   startLoading: () => void;
//   stopLoading: () => void;
//   isLoading: boolean;
// }
//
// export const LayoutContext = React.createContext<IProps>({} as IProps);
//
// export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
//   const [header, setHeader] = useState<boolean>(true);
//   const [footer, setFooter] = useState<boolean>(true);
//
//   const [loadingCount, setLoadingCount] = useState<number>(0);
//
//   const startLoading = () => setLoadingCount((count) => count + 1);
//   const stopLoading = () => setLoadingCount((count) => Math.max(0, count - 1));
//   const isLoading = loadingCount > 0;
//
//   const value: IProps = useMemo(() => {
//     return {
//       startLoading,
//       stopLoading,
//       isLoading,
//     };
//   }, [footer, header, loadingCount]);
//
//   return (
//     <LayoutContext.Provider value={value}>
//       <div style={{ position: 'relative' }}>
//         {children}
//          {isLoading && <LoadingScreen />}
//       </div>
//     </LayoutContext.Provider>
//   );
// };
//
// export const useLayout = () => React.useContext(LayoutContext);