import UserNav from "@/components/UserNav";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/useStoreActions";
import { MessageSquare, BellIcon, Menu } from "lucide-react";
import { MouseEventHandler } from "react";
const Header = ({
  handleDisplaySidebar,
}: {
  handleDisplaySidebar: MouseEventHandler;
}) => {
  const userDetails = useAppSelector("auth").userDetails;
  return (
    <div className="header-container bg-white sticky top-0 z-50 shadow-sm">
      <header
        className="flex h-[56px] items-center justify-between px-8  sticky top-0"
        role="banner"
      >
        <div className="lg:flex flex-1 items-center gap-5">
          <Menu
            className="lg:hidden cursor-pointer"
            onClick={handleDisplaySidebar}
          />
          <Input
            type="email"
            placeholder="Search..."
            className="bg-[#fafafa] hidden lg:flex w-[300px]"
          />
        </div>
        <div className="flex items-center justify-end flex-shrink-0 gap-5">
          <div className="message-box">
            <MessageSquare size={19} />
          </div>
          <div className="notification-icon">
            <BellIcon size={19} />
          </div>
          <div className="avatar">
            <UserNav userDetails={userDetails} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
