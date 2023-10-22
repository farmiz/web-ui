import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { columns } from "@/components/table/columns";
import { filters } from "@/components/table/data/filters";
import { useAppDispatch } from "@/hooks/useStoreActions";
import { ActionButtonProps } from "@/interfaces";
import { fetchUsers } from "@/store/userSlice/actions";
import { useEffect, useMemo } from "react";
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

  const disp = useAppDispatch();
  useEffect(() => {
    disp(fetchUsers({}));
  }, []);
  const columnsToDisplay = useMemo(() => columns, []);
  return (
    <DashboardLayout pageTitle="Discoveries List" actionButtons={actionButtons}>
      <Table
        showExportButton={true}
        title="Discoveries List"
        // fetchQuery={1}
        columns={columnsToDisplay}
        useActionButton={true}
        filters={filters}
      />
    </DashboardLayout>
  );
};

export default Discovery;
