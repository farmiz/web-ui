import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserProps } from "@/store/userSlice/types";
import React from "react";
import { Link } from "react-router-dom";

interface UserNavProps {
  userDetails: UserProps | null;
}
const UserNav: React.FC<UserNavProps> = React.memo(({ userDetails }) => {
  const navLinks = [
    {
      name: "Profile",
      route: "/profile",
      allowedRoles: [],
      shortcut: "⇧⌘P",
    },
    {
      name: "Settings",
      route: "/settings",
      allowedRoles: [],
      shortcut: "⌘S",
    },
  ];
  const fullName =
    userDetails && `${userDetails.firstName} ${userDetails.lastName}`;
  const userAbbreviation =
    userDetails &&
    `${userDetails?.firstName?.[0]}${userDetails?.lastName?.[0]}`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full outline-none focus-within:outline-none focus-visible:outline-none focus:outline-none border-none"
        >
          <Avatar className="h-8 w-8 outline-none">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>{userAbbreviation}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userDetails && userDetails.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navLinks && navLinks && navLinks.map((link) => {
            return (
              <Link
                to={link.route}
                role="button"
                className="block"
                key={link.route}
              >
                <DropdownMenuItem className="!cursor-pointer">
                  {link.name}
                  {link.shortcut && (
                    <DropdownMenuShortcut>{link.shortcut}</DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="!cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
export default UserNav;
