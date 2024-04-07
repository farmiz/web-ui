import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { errorToast } from "@/lib/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { loginAuth } from "@/store/authSlice";
import { Button } from "@/components/ui/button";

export default function AuthenticationPage() {
  const auth = useAppSelector("auth");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [authData, setAuthData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

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

  const handleAuthSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAuth(authData));
  };

  return (
    <div className="login-form  min-h-screen flex items-center justify-center">
      <div className=" w-1/2 flex items-center justify-center flex-col">
        <div className="flex-1 bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700 w-full">
          <form className="space-y-6" action="#" onSubmit={handleAuthSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white focus:ring-0"
                placeholder="name@company.com"
                value={authData.email}
                onChange={(e) =>
                  setAuthData({ ...authData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={authData.password}
                onChange={(e) =>
                  setAuthData({ ...authData, password: e.target.value })
                }
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-start"></div>
              <a
                href="#"
                className="text-sm text-blue-700 hover:underline ml-auto dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login to your account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
