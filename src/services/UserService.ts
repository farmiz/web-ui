import { RequestService } from "@/services/RequestService";

class UserService extends RequestService {
  constructor() {
    super("users");
  }

}

export const userService = new UserService();
