import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-context.tsx";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme == "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-100 transition-all dark:-rotate-0 dark:scale-100" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-black rotate-0 scale-100 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
