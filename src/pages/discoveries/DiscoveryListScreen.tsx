import Modal from "@/components/Modal";
import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { columns, filters } from "@/dataTable/discoveries";
import { useAppSelector } from "@/hooks/useStoreActions";
import { ActionButtonProps, ModalActionButtonProps } from "@/interfaces";
import { discoveryActions } from "@/store/discoverySlice/actions";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const Discovery = () => {
  const navigate = useNavigate();
  const discoveryStore = useAppSelector("discovery");
  const [openModal, setOpenModal] = useState(false);
  const [{}, setSelectedDiscovery] = useState<Record<string, any>>({});

  const handleCreateButtonClick = () => {
    navigate("/discoveries/create");
  };
  const actionButtons: ActionButtonProps = {
    createButton: {
      name: "Create Discovery",
      onClick: handleCreateButtonClick,
    },
  };

  const tableActionButtons = [
    {
      label: "Edit",
      action: (data: any) => {
        navigate(`/discoveries/${data.id}/update`);
      },
    },
    {
      label: "Delete",
      action: (data: Record<string, any>) => {
        setOpenModal(true);
        setSelectedDiscovery(data);
      },
    },
  ];

  const modalData = {
    showModal: openModal,
    modalTitle: "Delete Discovery",
    modalDescription: `Deleting this discovery will remove the discovery from the list`,
    actionButtons: [
      {
        title: "Cancel",
        action: () => setOpenModal(false),
        type: "cancel",
      },
      {
        title: "Continue",
        action: () => {},
        type: "action",
      },
    ] as ModalActionButtonProps[],
  };

  const columnsToDisplay = useMemo(() => columns, []);
  return (
    <DashboardLayout pageTitle="Discoveries List" actionButtons={actionButtons}>
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.modalTitle}
        modalDescription={modalData.modalDescription}
        actionButtons={modalData.actionButtons}
      />
      <Table
        showExportButton={true}
        title="Discoveries List"
        columns={columnsToDisplay}
        filters={filters}
        actionButtons={tableActionButtons}
        fetchQuery={discoveryActions.fetchDiscoveries}
        data={discoveryStore.discoveries}
        paginator={discoveryStore.paginator}
        showSearchSelection={true}
        searchSelectionOptions={[
          {label: "All Fields", value: ""},
          { label: "Name", value: "name" },
          { label: "Duration value", value: "duration.value" },
        ]}
      />
    </DashboardLayout>
  );
};

export default Discovery;
