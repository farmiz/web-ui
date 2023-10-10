import DashboardLayout from "@/components/dashboard/Layout";
// import Table from "@/components/tableData/Table";
import { ActionButtonProps } from "@/interfaces";
import { useNavigate } from "react-router-dom";
import Table from "@/components/Table"
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
      <Table />
    </DashboardLayout>
  );
};

export default Users;
