"use client";

import { MobileNav } from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context.tsx";
import { ChevronDown, Search, ShoppingBag, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, me, logout } = useAuth();

  const handleLogout = () => {
    logout.mutate();
  };

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

          {isAuthenticated ? (
            <>
              <button className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  0
                </span>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          me?.profilePicture ||
                          "/placeholder.svg?height=32&width=32"
                        }
                        alt={me?.name || "User"}
                      />
                      <AvatarFallback>
                        {me?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">
                      {me?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {me?.email || "user@example.com"}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant={"ghost"} className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  0
                </span>
              </Button>
              <Button variant={"ghost"}>
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-1 font-medium"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link to="/login" className="md:hidden">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
