import { authService } from "@/services/Auth";
import { setAuth } from "@/store/authSlice";
import { useAppDispatch } from "./useStoreActions";
function useRefreshToken() {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    const { response } = await authService.refresh();
    dispatch(
      setAuth({ accessToken: response.accessToken, userDetails: response.user })
    );
    return response?.accessToken;
  };
  return refresh;
}

export default useRefreshToken;
