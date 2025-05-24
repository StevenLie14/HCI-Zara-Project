import {useAuth} from "@/context/auth-context.tsx";
import {ShoppingBag, User} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {Link} from "react-router-dom";

interface IProps {
  showCart: boolean;
}
const ProfileNav = ({showCart} : IProps) => {
  const { isAuthenticated, me, logout } = useAuth();
  const handleLogout = async () => {
    logout.mutate()
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          {
            showCart && (
              <button className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    0
                  </span>
              </button>
            )
          }

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
    </>
  );
}

export default ProfileNav;