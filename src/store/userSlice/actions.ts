import { BaseAsyncThunkWrapper } from "../baseSlice";
const userThunkService = new BaseAsyncThunkWrapper("users");
export const userActions = {
  createUser: userThunkService.createOne("createUser"),
  fetchUsers: userThunkService.getMany("fetchUsers"),
  updateUser: userThunkService.updateOne("updateUser"),
  getSingleUser: userThunkService.getOne("getSingleUser"),
  deleteUser: userThunkService.deleteOne("deleteUser"),
};
