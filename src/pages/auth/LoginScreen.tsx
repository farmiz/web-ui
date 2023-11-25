import { useAppSelector } from "@/hooks/useStoreActions";
import { errorToast } from "@/lib/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AuthenticationPage() {
  const auth = useAppSelector("auth");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth.isError) {
      return errorToast(auth.message);
    }
    if (auth.isSuccess) {
      const routeTo = `/`;
      const from = location.state?.from?.pathname || routeTo;

      navigate(from, { replace: true });
    }
    () => {
      return;
    };
  }, [auth]);

  return <></>;
}
