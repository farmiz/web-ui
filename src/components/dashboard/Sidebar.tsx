import LogoutButton from "@/components/buttons/LogoutButton";
import ThemeSwitcher from "@/components/buttons/ThemeSwitcher";
import SidebarMenu from "./SidebarMenu";
import { generalSidebarRoutes, menuSidebarRoutes } from "@/routes";
import Logo from "/farmiz.svg";
const DashboardSidebar = () => {
  return (
    <div className="flex-shrink-0 overflow-x-hidden dark w-[260px] bg-[#10172a] z-[400] shadow-md">
      <div className="h-full w-[260px] p-5">
        <div className="flex h-full min-h-0 flex-col">
          <div className="relative h-full w-full flex-1 items-start border-white/20 flex flex-col">
            <div className="sidebar-main__content flex-grow w-full">
              <div className="logo mb-10">
                <img src={Logo} alt="Logo" className="w-[120px]" />
              </div>
              <div className="menu-items">
                <SidebarMenu title={menuSidebarRoutes.title} routesData={menuSidebarRoutes.routeLinks} />
                <SidebarMenu title={generalSidebarRoutes.title} routesData={generalSidebarRoutes.routeLinks}/>
              </div>
            </div>
            <div className="sidebar-footer w-full pl-3">
              <ThemeSwitcher />
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
       
    </div>
  );
};

export default DashboardSidebar;
