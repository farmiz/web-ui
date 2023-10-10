import UserNav from "@/components/UserNav";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks/useStoreActions";
import { MessageSquare, BellIcon } from "lucide-react";
const Header = () => {
  const userDetails = useAppSelector((state) => state.auth.userDetails);
  return (
    <div className="header-container bg-white">
      <header
        className="flex h-[56px] items-center justify-between relative px-8"
        role="banner"
      >
        <nav className="flex w-[300px] items-center justify-between">
          <Input
            type="email"
            placeholder="Search..."
            className="bg-[#fafafa]"
          />
        </nav>
        <div className="flex items-center justify-end flex-shrink-0 gap-5">
          <div className="message-box">
            <MessageSquare size={19} />
          </div>
          <div className="notification-icon">
            <BellIcon size={19} />
          </div>
          <div className="avatar">
            <UserNav userDeatils={userDetails} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
