import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [queryObject] = useState<Record<string, string>>({});
  const setQueryParam = (param: string, value: string) => {
    queryParams.set(param, value);
    updateUrl();
  };

  const removeQueryParam = (param: string) => {
    queryParams.delete(param);
    updateUrl();
  };

  const getQueryParam = (param: string) => {
    return queryParams.get(param);
  };

  const updateUrl = () => {
    navigate({
      search: `?${queryParams.toString()}`,
    });
  };

  return { setQueryParam, removeQueryParam, getQueryParam, queryObject };
};
