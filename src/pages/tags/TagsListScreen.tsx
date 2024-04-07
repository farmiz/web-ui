import DashboardLayout from "@/components/dashboard/Layout";
import Table from "@/components/table/Table";
import { tagsColumn } from "@/dataTable/tags";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { ActionButtonProps } from "@/interfaces";
import { errorToast } from "@/lib/toast";
import { tagActions } from "@/store/tagsSlice/actions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalActionButtonProps } from "@/interfaces";
import Modal from "@/components/Modal";

const TagsScreen = () => {
  const navigate = useNavigate();
  const tagStore = useAppSelector("tags");
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Record<string, any>>({});
  const handleCreateButtonClick = () => {
    navigate("/tags/create");
  };

  const actionButtons: ActionButtonProps = {
    createButton: {
      name: "Create Tag",
      onClick: handleCreateButtonClick,
    },
  };

  const tableActionButtons = [
    {
      label: "Edit",
      action: (data: any) => {
        navigate(`/tags/${data.id}`);
      },
    },
    {
      label: "Delete",
      action: (data: Record<string, any>) => {
        setOpenModal(true);
        setSelectedTag(data);
      },
    },
  ];
  useEffect(() => {
    if (tagStore.isError) {
      errorToast(tagStore.message);
    }
  }, [tagStore]);

  const modalData = {
    showModal: openModal,
    modalTitle: `Are you sure you want to delete tag`,
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
          await dispatch(tagActions.deleteTag(selectedTag.id));
          setLoading(false);
          setOpenModal(false);
        },
        type: "action",
        loading,
      },
    ] as ModalActionButtonProps[],
  };
  return (
    <DashboardLayout pageTitle="Tags" actionButtons={actionButtons}>
      <Modal
        showModal={modalData.showModal}
        modalTitle={modalData.modalTitle}
        actionButtons={modalData.actionButtons}
      />
      <Table
        title="Tags List"
        columns={tagsColumn}
        data={tagStore.tags}
        paginator={tagStore.paginator}
        fetchQuery={tagActions.fetchTags}
        actionButtons={tableActionButtons}
      />
    </DashboardLayout>
  );
};

export default TagsScreen;
