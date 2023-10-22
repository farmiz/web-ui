import axios from "axios";
import { useEffect } from "react";

useEffect(() => {
    const controller = new AbortController();

    axios.post("...", {}, { signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, []);