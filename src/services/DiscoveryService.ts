import { RequestService } from "@/services/RequestService";

class DiscoveryService extends RequestService {
  constructor() {
    super("discoveries");
  }

}

export const discoveryService = new DiscoveryService();
