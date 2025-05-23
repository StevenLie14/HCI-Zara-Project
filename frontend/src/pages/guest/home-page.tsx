import Navbar from "@/components/navbar.tsx";
import { useEffect } from "react";

export const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
    </div>
  );
};
