import { RequestService } from "@/services/RequestService";
import { AxiosRequestConfig } from "axios";

class InitService extends RequestService {
  constructor() {
    super("init");
  }

  async getCustomerOverview() {
    const requestConfig: AxiosRequestConfig = {
      url: "/customers/overview",
      responseType: "json",
    };
    return await this.request(requestConfig, {
      useToken: true,
      tokenType: "accessToken",
    });
  }
}

export const initService = new InitService();
