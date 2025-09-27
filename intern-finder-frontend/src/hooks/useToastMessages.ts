import { useToast } from "@/contexts/toast-context";

export const useToastMessages = () => {
  const { addToast } = useToast();

  const showSuccess = (message: string, duration?: number) => {
    addToast(message, "success", duration);
  };

  const showError = (message: string, duration?: number) => {
    addToast(message, "error", duration);
  };

  const showWarning = (message: string, duration?: number) => {
    addToast(message, "warning", duration);
  };

  const showInfo = (message: string, duration?: number) => {
    addToast(message, "info", duration);
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};
