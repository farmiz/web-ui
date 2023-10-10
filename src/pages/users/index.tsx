import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/tableData/Table";

const Users = () => {
  const handleCreateButtonClick = () => {};
  const actionButtons = {
    createButton: {
      name: "Create User",
      onclick: null,
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
