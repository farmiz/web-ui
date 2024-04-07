import { BaseAsyncThunkWrapper } from "../baseSlice";
const baseThunkService = new BaseAsyncThunkWrapper("discoveries");
export const discoveryActions = {
  createDiscovery: baseThunkService.createOne("createDiscovery"),
  fetchDiscoveries: baseThunkService.getMany("fetchDiscoveries"),
  updateDiscovery: baseThunkService.updateOne("updateDiscovery"),
  getSingleDiscovery: baseThunkService.getOne("getSingleDiscovery"),
  deleteDiscovery: baseThunkService.deleteOne("deleteDiscovery"),
};
