import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { ActionButtonProps } from "@/interfaces";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const navigate = useNavigate();
  const handleCreateButtonClick = () => {
    navigate("/users/create");
  };
  const actionButtons: ActionButtonProps = {
    createButton: {
      name: "Create User",
      onClick: handleCreateButtonClick,
    },
  };
  return (
    <DashboardLayout pageTitle="Users List" actionButtons={actionButtons}>
      <Table showExportButton={true} />
    </DashboardLayout>
  );
};

export default Users;
