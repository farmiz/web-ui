import { toast } from "sonner";
type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

interface ToastT extends Record<string, any> {
  position: Position;
}

type PromiseT<Data = any> = Promise<Data> | (() => Promise<Data>);
const defaultOptions: ToastT = {
  dismissible: true,
  important: true,
  duration: 2000,
  position: "top-right",
};
export const successToast = (
  description: string,
  options?: Record<string, any>
) => {
  toast.success(description, {
    ...defaultOptions,
    ...options
  });
};
export const errorToast = (
  description: string,
  options?: Record<string, any>
) => {
  toast.error(description, {
    ...defaultOptions,
    ...options
  });
};

interface PromiseData<ToastData> extends Record<string, any> {
  success:
    | string
    | React.ReactNode
    | ((data: ToastData) => React.ReactNode | string);
  error: string | React.ReactNode | ((error: any) => React.ReactNode | string);
  finally?: () => void | Promise<void>;
}
export const promiseToast = <T>(
  promise: PromiseT,
  options?: PromiseData<T>
) => {
  toast.promise(promise, {
    loading: "Loading...",
    ...(options as PromiseData<T>),
  });
};
