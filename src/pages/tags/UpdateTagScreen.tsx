import DashboardLayout from "@/components/dashboard/Layout";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { useNavigate, useParams } from "react-router-dom";
import TagsForm from "./components/TagsForm";
import { tagActions } from "@/store/tagsSlice/actions";
import { resetTag } from "@/store/tagsSlice";
import { useEffect, useState } from "react";
import { objectDifference } from "@/utils";

const CreateTagsScreen = () => {
  const tagStore = useAppSelector("tags");
  const { id = "" } = useParams();


  const [updatedFields, setUpdatedFields] = useState<Record<string, any>>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async () => {
    dispatch(tagActions.updateTag({ id, updatedFields }));
  };
  useEffect(() => {
    dispatch(tagActions.getSingleTag(id));
    return () => {
      dispatch(resetTag());
    };
  }, [id]);

  

  useEffect(() => {
    const difference = objectDifference(tagStore.editing, tagStore.editingTag);
    setUpdatedFields(difference);
  }, [tagStore.editingTag]);
  return (
    <DashboardLayout pageTitle="Update Tag">

      <TagsForm
        defaultFormValues={tagStore.editingTag}
        handleSubmit={handleFormSubmit}
        loading={tagStore.isLoading}
        disableButton={!Object.keys(updatedFields).length}
      />
    </DashboardLayout>
  );
};

export default CreateTagsScreen;
