import Modal from "@/components/Modal";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { columns } from "@/components/table/columns";
import { filters } from "@/components/table/data/filters";
import { ActionButtonProps, ModalActionButtonProps } from "@/interfaces";
import { fetchUsers } from "@/store/userSlice/actions";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersListScreen = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Record<string, any>>({});
  const handleCreateButtonClick = () => {
    navigate("/users/create");
  };
  const actionButtons: ActionButtonProps = {
    createButton: {
      name: "Create User",
      onClick: handleCreateButtonClick,
    },
  };

  const tableActionButtons = [
    {
      label: "Delete",
      action: (data: Record<string, any>) => {
        setOpenModal(true);
        setSelectedUser(data);
      },
    },
    {
      label: "Edit",
      action: (data: any) => {
        console.log(data.id);
        navigate(`/users/${data.id}`);
      },
    },
  ];
  const modalData = {
    showModal: openModal,
    modalTitle: (name: string) =>
      `Are you sure you want to delete  ${name}'s account`,
    modalDescription: `Deleting the user will permanently remove their account,
       associated data, and access rights. 
      Please ensure that you have verified the user's identity and that this action aligns with your organization's policies`,
    actionButtons: [
      {
        title: "Cancel",
        action: () => setOpenModal(false),
        type: "cancel"
      },
      {
        title: "Continue",
        action: () => {},
        type: "action"
      },
    ] as ModalActionButtonProps[],
  };
  const columnsToDisplay = useMemo(() => columns, []);
  return (
    <DashboardLayout pageTitle="Users List" actionButtons={actionButtons}>
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.modalTitle(selectedUser.firstName)}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      />
      <Table
        showExportButton={true}
        title="Users List"
        columns={columnsToDisplay}
        filters={filters}
        fetchQuery={fetchUsers}
        actionButtons={tableActionButtons}
      />
    </DashboardLayout>
  );
};

export default UsersListScreen;
