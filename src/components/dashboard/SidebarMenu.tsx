import React, { ElementType } from "react";
import SidebarMenuItem from "./SidebarMenuItem";
interface RouteDataProps {
  title: string;
  url: string;
  icon: ElementType;
}
interface SidebarMenuProps {
  title: string;
  routesData: RouteDataProps[];
}
const SidebarMenu: React.FC<SidebarMenuProps> = ({ title, routesData }) => {
  return (
    <div className="my-5">
      <p className="section-title text-white pl-3 text-[0.655rem]">{title}</p>
      <ul>
        {routesData.map((data) => {
          return (
            <SidebarMenuItem
              icon={<data.icon size={19} />}
              text={data.title}
              url={data.url}
              key={data.url}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarMenu;
