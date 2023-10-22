import { AxiosResponse } from "axios";

export class BaseResponse {
    public response: any;
    public success: boolean;
    constructor(response: AxiosResponse) {
      this.response = response.data.response || response.data;
      this.success = response.data.success;
    }
  }
  