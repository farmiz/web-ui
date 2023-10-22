import { RequestService } from "./RequestService";
import { AuthProps } from "../interfaces";
import { UserProps } from "../store/userSlice/types";

interface AuthResponseProps {
  response: {
    accessToken: string;
    user: UserProps
  };
  success: boolean;
}
class AuthService extends RequestService {
  constructor() {
    super("auth");
  }
  async login({
    email,
    password,
  }: Pick<AuthProps, "email" | "password">): Promise<AuthResponseProps> {
    return await this.createOne({email, password}, "login");
  }
}

export const authService = new AuthService();
