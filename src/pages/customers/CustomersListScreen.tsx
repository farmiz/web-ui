import { useState } from "react";
import DashboardLayout from "@/components/dashboard/Layout";
import Tabs from "@/components/tabs/Tabs";
import { TABS } from "./constants";
import Overview from "./components/Overview";
import { useNavigate } from "react-router-dom";
import { ActionButtonProps } from "@/interfaces";
import ViewList from "./components/ViewList";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { getCustomerOverview } from "@/store/initSlice/action";
import { FetchLoader } from "@/components/FetchLoader";

const CustomersListScreen = () => {
  const [activeTab, setActiveTab] = useState<TABS>("overview");
  const navigate = useNavigate();
  const initStore = useAppSelector("init");
  const dispatch = useAppDispatch();
  const handleTabClick = (newActiveTab: TABS) => {
    setActiveTab(newActiveTab);
    if (newActiveTab === "overview") {
      dispatch(getCustomerOverview());
    }
  };

  let content;
  switch (activeTab) {
    case "overview":
      content = <Overview overviewData={initStore.customerOverview} />;
      break;
    case "view_list":
      content = <ViewList />;
      break;
    default:
      content = <h1>No content available</h1>;
  }

  const handleCreateButtonClick = () => {
    navigate("/customers/create");
  };
  const actionButtons: ActionButtonProps = {
    createButton: {
      name: "Add Customer",
      onClick: handleCreateButtonClick,
    },
  };

  return (
    <DashboardLayout
      pageTitle="Customers"
      showScrollToTopButton={true}
      actionButtons={actionButtons}
    >
      <Tabs tabs={TABS} handleTabClick={handleTabClick} />
      {initStore.isLoading ? (
        <div className="h-full flex items-center justify-center">
          <FetchLoader />
        </div>
      ) : (
        content
      )}
    </DashboardLayout>
  );
};

export default CustomersListScreen;
