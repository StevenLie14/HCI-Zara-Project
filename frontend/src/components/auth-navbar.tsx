import BackButton from "@/components/back-button.tsx";
import { ThemeToggle } from "@/components/theme-toggle.tsx";
import { Link } from "react-router-dom";

interface AuthHeaderProps {
  showBackButton?: boolean;
}

const AuthNavbar = ({ showBackButton = true }: AuthHeaderProps) => {
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex justify-between items-center gap-4">
          {showBackButton && <BackButton />}
          <Link to="/" className="text-xl font-bold uppercase">
            Zara
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default AuthNavbar;
