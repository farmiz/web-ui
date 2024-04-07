import { RequestService } from "@/services/RequestService";

class TagsService extends RequestService {
  constructor() {
    super("tags");
  }

}

export const tagsService = new TagsService();
