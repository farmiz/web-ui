import Modal from "@/components/Modal";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { columns } from "@/dataTable/users";
import { filters } from "@/dataTable/users";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import {
  ActionButtonProps,
  ModalActionButtonProps,
  OptionsProps,
} from "@/interfaces";
import { userActions } from "@/store/userSlice/actions";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersListScreen = () => {
  const navigate = useNavigate();
  const userDispatch = useAppDispatch();
  const userStore = useAppSelector("users");
  const [loading, setLoading] = useState(false);
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
      label: "Edit",
      action: (data: any) => {
        navigate(`/users/${data.id}/update`);
      },
    },
    {
      label: "Delete",
      action: (data: Record<string, any>) => {
        setOpenModal(true);
        setSelectedUser(data);
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
        type: "cancel",
      },
      {
        title: "Continue",
        action: async () => {
          setLoading(true);
          await userDispatch(userActions.deleteUser(selectedUser.id));
          setLoading(false);
          setOpenModal(false);
        },
        type: "action",
        loading,
      },
    ] as ModalActionButtonProps[],
  };

  const columnsToDisplay = useMemo(() => columns, []);

  const searchSelectionOptions: OptionsProps[] = [
    { label: "All Fields", value: "" },
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Email", value: "email" },
    { label: "Role", value: "role" },
  ];
  return (
    <DashboardLayout
      pageTitle="Users List"
      actionButtons={actionButtons}
      showScrollToTopButton={true}
    >
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
        fetchQuery={userActions.fetchUsers}
        actionButtons={tableActionButtons}
        allowRowSelect={true}
        data={userStore.users}
        paginator={userStore.paginator}
        showSearchSelection={true}
        searchSelectionOptions={searchSelectionOptions}
      />
    </DashboardLayout>
  );
};

export default UsersListScreen;
