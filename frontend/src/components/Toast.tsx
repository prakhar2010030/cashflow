// components/Toast.tsx
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";

export interface ToastTypeInterface {
  isCalled: boolean;
  type: "success" | "error" | "";
  toastMsg: string;
}
const Toast = ({
  toastState,
  onReset,
}: {
  toastState: ToastTypeInterface;
  onReset: () => void;
}) => {
  useEffect(() => {
    if (toastState.isCalled) {
      if (toastState.type === "success") {
        toast.success(toastState.toastMsg);
      } else if (toastState.type === "error") {
        toast.error(toastState.toastMsg);
      }
    }
    const timer = setTimeout(() => {
      onReset();
    }, 1500);

    return () => clearTimeout(timer);
  }, [toastState]);

  return <Toaster position="top-center" />;
};

export default Toast;
