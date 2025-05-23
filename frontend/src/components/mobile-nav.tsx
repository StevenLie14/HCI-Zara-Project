"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/auth-context.tsx";
import { Heart, LogOut, Menu, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, me, logout } = useAuth();

  const categories = [
    {
      name: "Women",
      subcategories: [
        "New In",
        "Clothing",
        "Shoes",
        "Accessories",
        "Dresses",
        "Tops",
      ],
    },
    {
      name: "Men",
      subcategories: [
        "New In",
        "Clothing",
        "Shoes",
        "Accessories",
        "Suits",
        "Shirts",
      ],
    },
    {
      name: "Kids",
      subcategories: ["Girls", "Boys", "Baby", "Shoes", "Accessories"],
    },
    {
      name: "Accessories",
      subcategories: [
        "Bags",
        "Jewelry",
        "Scarves",
        "Belts",
        "Hats",
        "Sunglasses",
      ],
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] sm:w-[350px] pr-0">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        {isAuthenticated && (
          <div className="flex items-center gap-3 mb-6 px-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={
                  me?.profilePicture || "/placeholder.svg?height=40&width=40"
                }
                alt={me?.name || "User"}
              />
              <AvatarFallback>{me?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{me?.name || "User"}</span>
              <span className="text-xs text-muted-foreground">
                {me?.email || "user@example.com"}
              </span>
            </div>
          </div>
        )}

        <div className="overflow-y-auto h-[calc(100vh-10rem)]">
          <Accordion type="multiple" className="w-full">
            {categories.map((category) => (
              <AccordionItem value={category.name} key={category.name}>
                <AccordionTrigger className="px-4 py-3">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-4">
                    {category.subcategories.map((subcategory) => (
                      <SheetClose asChild key={subcategory}>
                        <Link
                          to="#"
                          className="py-2 px-4 hover:bg-accent rounded-md transition-colors"
                        >
                          {subcategory}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="border-t mt-4 pt-4">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-1">
                <SheetClose asChild>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-md transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>My Profile</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-md transition-colors"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>My Orders</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/wishlist"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-md transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </Link>
                </SheetClose>
                <button
                  onClick={() => logout.mutate}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-accent rounded-md transition-colors text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="px-4 py-3">
                <SheetClose asChild>
                  <Link to="/login">
                    <Button className="w-full mb-2">Login</Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/register">
                    <Button variant="outline" className="w-full">
                      Register
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
