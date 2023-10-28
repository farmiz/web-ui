import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { columns } from "@/components/table/columns";
import { filters } from "@/components/table/data/filters";
import { ActionButtonProps } from "@/interfaces";
import { fetchUsers } from "@/store/userSlice/actions";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const UsersListScreen = () => {
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

  const columnsToDisplay = useMemo(() => columns, []);
  return (
    <DashboardLayout pageTitle="Users List" actionButtons={actionButtons}>
      <Table
        showExportButton={true}
        title="Discoveries List"
        columns={columnsToDisplay}
        filters={filters}
        fetchQuery={fetchUsers}
      />
    </DashboardLayout>
  );
};

export default UsersListScreen;
