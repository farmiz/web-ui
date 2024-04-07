import { useState, type ReactNode } from "react";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import Content from "@/components/dashboard/Content";
import HeaderTitle from "./HeaderTitle";
import BreadCrumb from "../BreadCrumb";

interface DashboardLayoutProps {
  children: ReactNode;
  showScrollToTopButton?: boolean;
  showSidebar?: boolean;
  showHeader?: boolean;
  pageTitle: string;
  pageDescription?: string;
  showPageExporter?: boolean;
  actionButtons?: Record<string, any>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  showScrollToTopButton = false,
  showHeader = true,
  showSidebar = true,
  pageTitle,
  pageDescription,
  showPageExporter = false,
  actionButtons,
}) => {
  const handleDisplaySidebar = () => {
    setDisplaySidebar(!displaySidebar);
  };
  const [displaySidebar, setDisplaySidebar] = useState(true);
  return (
    <div className="overflow-hidden w-full h-screen relative flex z-0 bg-[#fafafa]">
      {showSidebar && <Sidebar displaySidebar={displaySidebar} />}
      <div className="main-content relative flex h-full max-w-full flex-1 overflow-hidden">
        <div className="flex h-full max-w-full flex-1 flex-col">
          <main className="relative h-full w-full transition-width overflow-auto flex-1">
            <div className="h-full" role="presentation">
              {showHeader && <Header handleDisplaySidebar={handleDisplaySidebar}/>}
              <Content showScrollToTopButton={showScrollToTopButton}>
                <HeaderTitle
                  pageTitle={pageTitle}
                  pageDescription={pageDescription}
                  showPageExporter={showPageExporter}
                  actionButtons={actionButtons}
                />
                <BreadCrumb />

                {children}
              </Content>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
