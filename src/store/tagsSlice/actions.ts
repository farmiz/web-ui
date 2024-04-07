import { BaseAsyncThunkWrapper } from "../baseSlice";
const tagsThunkService = new BaseAsyncThunkWrapper("tags");
export const tagActions = {
  createTag: tagsThunkService.createOne("createTag"),
  fetchTags: tagsThunkService.getMany("fetchTags"),
  updateTag: tagsThunkService.updateOne("updateTag"),
  getSingleTag: tagsThunkService.getOne("getSingleTag"),
  deleteTag: tagsThunkService.deleteOne("deleteTag"),
};
