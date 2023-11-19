import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { AxiosError } from "axios";
import { BaseRequestService } from "@/services/BaseRequestService";
import { resetAuth, setAuth } from "@/store/authSlice";

const PersistLogin = () => {
  const baseRequest = new BaseRequestService();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const auth = useAppSelector("auth");
  const verifyRefreshToken = async () => {
    try {
      const response = await baseRequest.refreshToken(
        "accessToken"
      );
      dispatch(setAuth(response));
    } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 403 && !auth.userDetails) {
          dispatch(resetAuth())
          navigate("/auth/login");
        }
    } finally {
      setIsLoading(false);
      
    }
  };
  useEffect(() => {
      if (!auth.userDetails || !Object.keys(auth.userDetails).length) {
        verifyRefreshToken();
      } else {
        setIsLoading(false);
      }
  }, []);
  return <>{isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
