import { RequestService } from "@/services/RequestService";

class DiscoveryService extends RequestService {
  constructor() {
    super("discovery");
  }

}

export const discoveryService = new DiscoveryService();
