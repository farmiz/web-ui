import TitleWithDescription from "@/components/TitleWithDescription";
import DashboardLayout from "@/components/dashboard/Layout";
import Tabs from "@/components/tabs/Tabs";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useParams } from "react-router-dom";
import { CUSTOMER_UPDATE_TABS, TABS } from "./constants";
import { useCallback, useEffect, useState } from "react";
import CustomerProfileView from "./components/CustomerProfileView";
import { FetchLoader } from "@/components/FetchLoader";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { userActions } from "@/store/userSlice/actions";
import { resetUserStore } from "@/store/userSlice";
import { formatAddressToString, formatPhoneToString } from "@/utils";
import { Button } from "@/components/ui/button";
import Drawer from "@/components/Drawer";

const CustomerProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<TABS>("summary");
  const [loading, setLoading] = useState(false);
  const { id = "" } = useParams();
  const userStore = useAppSelector("users");
  const customer = userStore.editing;
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleTabClick = (newActiveTab: TABS) => {
    setLoading(true);
    setTimeout(() => {
      setActiveTab(newActiveTab);
      setLoading(false);
    }, 2000);
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userActions.getSingleUser(id));
    return () => {
      dispatch(resetUserStore());
    };
  }, [id]);

  const userStatus: Record<string, string> = {
    pendingApproval: "bg-yellow-50 text-green-700",
    active: "bg-green-50 text-green-700",
  };
  const handleDrawerOpen = useCallback(() => {
    setOpenDrawer(true);
  }, []);
  const handleDrawerClose = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  return (
    <DashboardLayout pageTitle="Customer Profile">
      <div className="flex gap-5">
        <div className="profile-card flex-1 space-y-1.5 p-6 pb-0 bg-white rounded-sm">
          <div className="profile flex gap-10 mb-10">
            <div className="avatar">
              <Avatar className="h-24 w-24 outline-none">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
            </div>
            <div className="profile-details justify-between flex-1">
              <div className="flex items-center gap-5 mt-5">
                <h1 className="text-2xl font-medium">
                  {customer.firstName || ""} {customer.lastName || ""}
                </h1>
                <span
                  className={`rounded-full ${
                    userStatus[customer.status] || "bg-red-50 text-red-700"
                  } px-5 py-1 text-xs font-medium inline-flex`}
                >
                  {customer.status}
                </span>
              </div>
              <div className="flex justify-between">
                <TitleWithDescription
                  title="Phone"
                  description={formatPhoneToString(customer.phone)}
                />
                <TitleWithDescription
                  title="Email"
                  description={customer.email || "N/A"}
                />
                <TitleWithDescription
                  title="Location"
                  description={formatAddressToString(customer.physicalAddress)}
                />
              </div>
            </div>
            <div className="edit">
              <Button
                className="text-sm font-bold text-[#10172a] bg-transparent hover:bg-transparent"
                onClick={handleDrawerOpen}
              >
                Edit
              </Button>
            </div>
          </div>
          <Tabs tabs={CUSTOMER_UPDATE_TABS} handleTabClick={handleTabClick} />
        </div>
      </div>
      <div className="bg-red-300 min-h-screen">
        {loading ? (
          <div className=" flex justify-center items-center">
            <FetchLoader />
          </div>
        ) : (
          <CustomerProfileView tab={activeTab} />
        )}
      </div>
      <Drawer
        description="Customer Details"
        title="Edit Details about the customer"
        open={openDrawer}
        loading={loading}
        handleDrawerClose={handleDrawerClose}
      >
        <div></div>
      </Drawer>
    </DashboardLayout>
  );
};

export default CustomerProfileScreen;
