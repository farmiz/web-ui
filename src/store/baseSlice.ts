import { BaseResponse } from "@/services/BaseResponse";
import { RequestService } from "@/services/RequestService";
import { ServiceName } from "@/services/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface AsyncThunkWrapperProps<Payload> {
  name: string;
  asyncFn: (payload: Payload) => Promise<BaseResponse>;
}

export class BaseAsyncThunkWrapper {
  private name;
  private requestService: RequestService;
  constructor(name: ServiceName) {
    this.name = name;
    this.requestService = new RequestService(name);
  }

  createAsyncThunkWrapper = <Payload>(
    props: AsyncThunkWrapperProps<Payload>
  ) => {
    return createAsyncThunk(
      `${this.name}/${props.name}`,
      async (payload: Payload, thunkAPI) => {
        try {
          const response = await props.asyncFn(payload);
          return response;
        } catch (error: any) {
          const errorMessage = error.message;
          return thunkAPI.rejectWithValue(errorMessage);
        }
      }
    );
  };
  createOne = (name: string) =>
    this.createAsyncThunkWrapper<Record<string, string>>({
      asyncFn: this.requestService.createOne,
      name,
    });

  getMany = (name: string) =>
    this.createAsyncThunkWrapper({
      asyncFn: this.requestService.getMany,
      name,
    });

  getOne = (name: string) =>
    this.createAsyncThunkWrapper<string>({
      asyncFn: (id) => this.requestService.getOne({ id }),
      name,
    });

  deleteOne = (name: string) =>
    this.createAsyncThunkWrapper<string>({
      asyncFn: (id) => this.requestService.deleteOne(id),
      name,
    });

  updateOne = (name: string) =>
    this.createAsyncThunkWrapper<{
      updatedFields: Record<string, any>;
      id: string;
    }>({
      asyncFn: ({ updatedFields, id }) =>
        this.requestService.updateOne(updatedFields, id),
      name,
    });
}

