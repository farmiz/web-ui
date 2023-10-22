import { RequestService } from "@/services/RequestService";

class DiscoveryService extends RequestService {
  constructor() {
    super("users");
  }

}

export const discoveryService = new DiscoveryService();
