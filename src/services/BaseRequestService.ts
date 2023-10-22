import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { BaseResponse } from "@/services/BaseResponse";
import { ErrorWrapper } from "@/services/ErrorWrapper";

type TokenType = "accessToken";
interface RequestOptions {
  useToken: boolean;
  tokenType?: TokenType | null;
  contentType?: string;
}

export class BaseRequestService {
  private axiosInstance: AxiosInstance;

  // Initialize axios
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:8080/v1",
      withCredentials: true,
    });
  }

  //
  async request(
    axiosConfig: AxiosRequestConfig,
    options: RequestOptions = {
      tokenType: null,
      useToken: false,
    }
  ): Promise<BaseResponse> {
    try {
      const { useToken, tokenType } = options;

      // check if request should use accessToken
      if (useToken && tokenType) {
        const accessTokenFromStore = localStorage.getItem(tokenType) || null;
        // axios shoud attach access token to each request
        this.axiosInstance.interceptors.request.use(
          (config) => {
            if (!config.headers["Authorization"]) {
              config.headers[
                "Authorization"
              ] = `Bearer ${accessTokenFromStore}`;
            }
            return config;
          },
          (err) => Promise.reject(err)
        );

        // if response comes in and there is a 403 error, axios should fetch a new access token and retry the request again
        this.axiosInstance.interceptors.response.use(
          (response) => response,
          async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
              prevRequest.sent = true;
              const response = await this.refreshToken(tokenType);
              prevRequest.headers[
                "Authorization"
              ] = `Bearer ${response.accessToken}`;
              this.axiosInstance(prevRequest);
            }
            return Promise.reject(error);
          }
        );
      }

      const response = await this.axiosInstance.request(axiosConfig);
      return new BaseResponse(response);
    } catch (e: any) {
      throw new ErrorWrapper(e);
    }
  }

  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  // refresh token
  async refreshToken(tokenType: TokenType) {
    try {      
      const axiosInstance = this.getInstance();
      const { data } = await axiosInstance.get("/auth/refresh");
      const response = data.response;
      localStorage.setItem(tokenType, response.accessToken);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
