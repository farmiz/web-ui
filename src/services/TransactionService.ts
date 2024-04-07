import { RequestService } from "@/services/RequestService";

class TransactionService extends RequestService {
  constructor() {
    super("transactions");
  }

}

export const transactionService = new TransactionService();