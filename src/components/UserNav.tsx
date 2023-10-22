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
  userDeatils: UserProps | null;
}
const UserNav: React.FC<UserNavProps> = React.memo(({ userDeatils }) => {
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
    userDeatils && `${userDeatils.firstName} ${userDeatils.lastName}`;
  const userAbbreviation =
    userDeatils &&
    `${userDeatils?.firstName?.[0]}${userDeatils?.lastName?.[0]}`;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
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
              {userDeatils && userDeatils.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navLinks.map((link) => {
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
