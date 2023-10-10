import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/tableData/Table";
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
      <Table>
        <h1>Table oo table</h1>
      </Table>
    </DashboardLayout>
  );
};

export default Users;
