import { useAuth } from "@/context/auth-context.tsx";
import { ShoppingBag, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import {Role} from "@/models/enum/role-enum.ts";

const ProfileNav = () => {
  const { isAuthenticated, me, logout } = useAuth();
  const [isCartOpen, setCartIsOpen] = useState(false);
  const handleLogout = async () => {
    logout.mutate();
  };

  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      image: "/picture/kid-card.png",
      price: 100000,
      qty: 2,
      seller: "Seller A",
    },
    {
      id: 2,
      name: "Product 2",
      image: "/picture/women-card.png",
      price: 150000,
      qty: 1,
      seller: "Seller B",
    },
    // Add more items as needed
  ]

  return (
    <>
      {isAuthenticated ? (
        <>
          <div
            onMouseEnter={() => setCartIsOpen(true)}
            onMouseLeave={() => setCartIsOpen(false)}
          >
            <DropdownMenu onOpenChange={setCartIsOpen} open={isCartOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8">
                  <ShoppingBag className="h-5 w-5"/>
                  <span
                    className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    0
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 shadow-lg -translate-y-2" align="center" forceMount>
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <p className="font-semibold text-sm">
                    Cart ({cartItems.length})
                  </p>
                  <Link to="/cart" className="text-sm hover:underline">
                    See More...
                  </Link>
                </div>

                {/* Cart items */}
                <div className="max-h-80 overflow-y-auto divide-y">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-3 p-4 items-start">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.seller}</p>
                      </div>
                      <div className="text-sm font-semibold whitespace-nowrap">
                        {item.qty} × Rp{item.price.toLocaleString("id-ID")}
                      </div>
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>


          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      me?.profilePicture ||
                      "/placeholder.svg?height=32&width=32"
                    }
                    alt={me?.name || "User"}
                  />
                  <AvatarFallback>{me?.name?.charAt(0) || "U"}</AvatarFallback>
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
              { me?.role === Role.ADMIN && (
                <DropdownMenuItem asChild>
                  <Link to="/admin/dashboard">Admin</Link>
                </DropdownMenuItem>
              )}
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
};

export default ProfileNav;
