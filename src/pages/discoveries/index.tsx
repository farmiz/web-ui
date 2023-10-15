import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { ActionButtonProps } from "@/interfaces";
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
  return (
    <DashboardLayout pageTitle="Discoveries List" actionButtons={actionButtons}>
      <Table showExportButton={true} title="Discoveries List" />
    </DashboardLayout>
  );
};

export default Discovery;
