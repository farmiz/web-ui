import { AxiosRequestConfig } from "axios";
import { BaseResponse } from "./BaseResponse";
import { BaseRequestService } from "./BaseRequestService";

type ServiceName = "auth" | "users";
export class RequestService extends BaseRequestService {
  private name: string;
  constructor(name: ServiceName) {
    super();
    this.name = name;
  }

  public getOne = async (
    params: Record<string, any>,
    data: string
  ): Promise<BaseResponse> => {
    let url = this.name;
    const paramValues = Object.values(params);
    if (!paramValues.length) throw new Error("no params provided");
    const paramValuesFormatted = paramValues.join("/");
    if (data) {
      url = `${this.name}/${data}`;
    }
    const requestConfig: AxiosRequestConfig = {
      url: `${url}/${paramValuesFormatted}`,
      method: "get",
    };
    return await this.request(requestConfig, {
      useToken: true,
    });
  };
  public createOne = async (
    body: Record<string, any>,
    data?: string
  ): Promise<BaseResponse> => {
    let url = this.name;
    if (data) {
      url = `${this.name}/${data}`;
    }
    const requestConfig: AxiosRequestConfig = {
      url: `${url}`,
      method: "post",
      data: body,
    };

    return await this.request(requestConfig, {
      useToken: true,
    });
  };
  public getMany = async (
    query: Record<string, any>
  ): Promise<BaseResponse> => {

    const requestConfig: AxiosRequestConfig = {
      url: `${this.name}`,
      method: "get",
      params: query,
    };
    return await this.request(requestConfig, {
      useToken: true,
    });
  };
}
