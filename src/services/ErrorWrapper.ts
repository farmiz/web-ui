
import { AxiosError } from "axios";
import { BaseResponse } from "./BaseResponse";

export class ErrorWrapper extends Error {
  public name: string;
  public stack: string | undefined;
  public success: boolean;
  public status: number | boolean;
  public statusMessage: string;
  public raw: any;

  constructor(error: AxiosError<BaseResponse>) {
    super();
    this.raw = error;
    this.name = "ErrorWrapper";
    this.stack = new Error().stack;
    this.success = error.response
      ? error.response.data.success
      : false;
    this.status = error.response ? error.response.status : 0;
    this.statusMessage = this.getStatusMessage(this.status);
    this.message = this.getResponseErrorMessage(error);
  }

  private getResponseErrorMessage(error: AxiosError<BaseResponse>): string {
    if (error.response && error.response.data && error.response.data)
      return error.response.data.response.message;
    if (error.message) return error.message;
    return `getResponseErrorMessage can't handle error`;
  }

  private getStatusMessage(status: number): string {
    let message = "";
    switch (status) {
      case 200:
      case 201:
        message = "Request Successful";
        break;
      case 400:
        message = "Bad Request";
        break;
      case 401:
        message = "Authentication Required";
        break;
      case 404:
        message = "Not found";
        break;
      case 503:
        message = "Service Unavailable";
        break;
      default:
        message = "Unknown Error";
        break;
    }
    return message;
  }
}
