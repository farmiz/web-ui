import { LogOut } from "lucide-react";
const LogoutButton = () => {
  return (
    <div className="my-5 p-2 bg-[#202941] text-white flex items-center gap-3 rounded-lg" role="button">
      <div className="icon">
        <LogOut size={20} />
      </div>
      <p>Logout</p>
    </div>
  );
};

export default LogoutButton;
