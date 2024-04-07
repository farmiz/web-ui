import Modal from "@/components/Modal";
import Table from "@/components/table/Table";
import { customerColumns } from "@/dataTable/customers";
import { filters } from "@/dataTable/customers";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { ModalActionButtonProps } from "@/interfaces";
import { userActions } from "@/store/userSlice/actions";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewList = () => {
  const navigate = useNavigate();
  const userDispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Record<string, any>>({});
  const usersStore = useAppSelector("users");
  const tableActionButtons = [
    {
      label: "Edit",
      action: (data: any) => {
        navigate(`/customers/${data.id}`);
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
    modalDescription: `Deleting the customer will permanently remove their account,
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

  const columnsToDisplay = useMemo(() => customerColumns, []);

  return (
    <>
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.modalTitle(selectedUser.firstName)}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      />
      <Table
        title="customer"
        columns={columnsToDisplay}
        data={usersStore.users}
        showSelectColumns={true}
        filters={filters}
        paginator={usersStore.paginator}
        showExportButton={true}
        actionButtons={tableActionButtons}
      />
    </>
  );
};

export default ViewList;
