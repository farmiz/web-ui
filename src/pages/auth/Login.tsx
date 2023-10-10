import InputErrorMessage from "@/components/InputErrorMessage";
import Alert from "@/components/alerts/Alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginValidationSchema } from "@/formValidations/auth";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreActions";
import { errorToast, successToast } from "@/lib/toast";
import { loginAuth } from "@/store/authSlice";
import { SubmitHandler } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

export default function AuthenticationPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { errors, handleSubmit, isSubmitting, register } = useFormValidation(
    loginValidationSchema
  );

  const auth = useAppSelector((state) => state.auth);
  const { isLoading } = auth;
  type FormSchemaType = z.infer<typeof loginValidationSchema>;
  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      dispatch(loginAuth(data));

      if (auth.isError) {
        errorToast(auth.message);
      }
      if (auth.isSuccess) {
        successToast(auth.message);
        const routeTo = `/`;
        const from = location.state?.from?.pathname || routeTo;

        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      }
      console.log({ auth });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <img
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <form className="lg:p-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:max-w-lg">
            <Card>
              <CardHeader className="space-y-1">
                {auth.isError && <Alert type="warning" text={auth.message} />}
                <CardTitle className="text-2xl text-center">Sign in</CardTitle>
                <CardDescription className="text-center">
                  Enter your email and password to login
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text"
                    placeholder="Email"
                    {...register("email")}
                    autoComplete="false"
                  />
                  <InputErrorMessage errors={errors} fieldName="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    autoComplete="false"
                  />
                  <InputErrorMessage errors={errors} fieldName="password" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full" disabled={isSubmitting || isLoading}>
                  Login
                </Button>
                <p className="mt-2 text-xs text-center text-gray-700">
                  {" "}
                  Don't have an account?{" "}
                  <span className=" text-blue-600 hover:underline">
                    Sign up
                  </span>
                </p>
              </CardFooter>
            </Card>

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
