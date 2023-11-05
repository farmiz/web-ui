import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { columns, filters } from "@/dataTable/discoveries";
import { ActionButtonProps } from "@/interfaces";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
const Discovery = () => {
  const navigate = useNavigate();
  const handleCreateButtonClick = () => {
    navigate("/discoveries/create");
  };
  const actionButtons: ActionButtonProps = {
    createButton: {
      name: "Create Discovery",
      onClick: handleCreateButtonClick,
    },
  };

  const columnsToDisplay = useMemo(() => columns, []);
  return (
    <DashboardLayout pageTitle="Discoveries List" actionButtons={actionButtons}>
      <Table
        showExportButton={true}
        title="Discoveries List"
        columns={columnsToDisplay}
        filters={filters}
      />
    </DashboardLayout>
  );
};

export default Discovery;
