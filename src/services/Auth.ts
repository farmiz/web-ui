import { API_ROUTES } from "@/utils/constants";
import { RequestService } from ".";
import { AuthProps } from "../interfaces";
import { UserProps } from "../interfaces/users";

interface AuthResponseProps {
  response: {
    accessToken: string;
  } & UserProps;
  success: boolean;
}
class AuthService extends RequestService {
  async login({
    email,
    password,
  }: Pick<AuthProps, "email" | "password">): Promise<AuthResponseProps> {
    return await this.post<AuthResponseProps>(API_ROUTES.AUTH.LOGIN, {
      email,
      password,
    });
  }
  async refresh() {
    return await this.get<{
      response: {
        user: UserProps,
        accessToken: string;
      },
      success: true
    }>(API_ROUTES.AUTH.REFRESH, {
      withCredentials: true,
    });
  }
}

export const authService = new AuthService();
