import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileNav from "@/components/nav/profile-nav.tsx";

const Navbar = () => {

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 md:gap-8">
          <MobileNav />

          <Link to="/" className="text-xl font-bold uppercase">
            Zara
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex space-x-6">
              <li className="group relative">
                <button className="flex items-center gap-1 font-medium">
                  Women <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full z-10 mt-2 hidden w-48 rounded-md border bg-background shadow-lg group-hover:block">
                  <div className="p-2">
                    <Link
                      to="#"
                      className="block rounded-md px-3 py-2 hover:bg-accent"
                    >
                      New In
                    </Link>
                    <Link
                      to="#"
                      className="block rounded-md px-3 py-2 hover:bg-accent"
                    >
                      Clothing
                    </Link>
                    <Link
                      to="#"
                      className="block rounded-md px-3 py-2 hover:bg-accent"
                    >
                      Shoes
                    </Link>
                    <Link
                      to="#"
                      className="block rounded-md px-3 py-2 hover:bg-accent"
                    >
                      Accessories
                    </Link>
                  </div>
                </div>
              </li>
              <li className="group relative">
                <button className="flex items-center gap-1 font-medium">
                  Men <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 top-full z-10 mt-2 hidden w-48 rounded-md border bg-background shadow-lg group-hover:block">
                  <div className="p-2">
                    <Link
                      to="#"
                      className="block rounded-md px-3 py-2 hover:bg-accent"
                    >
                      New In
                    </Link>
                    <Link
                      to="#"
                      className="block rounded-md px-3 py-2 hover:bg-accent"
                    >
                      Clothing
                    </Link>
                    <Link
                      to="#"
                      className="block rounded-md px-3 py-2 hover:bg-accent"
                    >
                      Shoes
                    </Link>
                    <Link
                      to="#"
                      className="block rounded-md px-3 py-2 hover:bg-accent"
                    >
                      Accessories
                    </Link>
                  </div>
                </div>
              </li>
              <li className="group relative">
                <button className="flex items-center gap-1 font-medium">
                  Kids <ChevronDown className="h-4 w-4" />
                </button>
              </li>
              <li className="group relative">
                <button className="flex items-center gap-1 font-medium">
                  Accessories <ChevronDown className="h-4 w-4" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-[200px] rounded-full bg-accent/50 pl-8 pr-4"
            />
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          <ThemeToggle />

          <ProfileNav showCart={true} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
