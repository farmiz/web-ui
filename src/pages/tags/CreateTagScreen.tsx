import DashboardLayout from "@/components/dashboard/Layout";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { useNavigate } from "react-router-dom";
import TagsForm from "./components/TagsForm";
import { tagActions } from "@/store/tagsSlice/actions";
import { resetTag } from "@/store/tagsSlice";
import { useEffect } from "react";
import { errorToast, successToast } from "@/lib/toast";

const CreateTagsScreen = () => {
  const tagStore = useAppSelector("tags");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    dispatch(tagActions.createTag(tagStore.editingTag));
  };

  useEffect(() => {
    dispatch(resetTag());
  }, []);
  useEffect(() => {
    if (tagStore.isError) {
      errorToast(tagStore.message);
    } else if (tagStore.isSuccess && Object.keys(tagStore.editingTag).length) {
      dispatch(resetTag());
      successToast("Tag created successfully");
      navigate("/tags");
    }
  }, [tagStore.isLoading, tagStore.isError, tagStore.isSuccess]);

  return (
    <DashboardLayout pageTitle="Create Tag">
      <TagsForm
        defaultFormValues={tagStore.editingTag}
        handleSubmit={handleFormSubmit}
        loading={tagStore.isLoading}
      />
    </DashboardLayout>
  );
};

export default CreateTagsScreen;
