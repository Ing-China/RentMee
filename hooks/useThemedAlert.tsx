import { useState } from "react";

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

interface AlertOptions {
  title?: string;
  message?: string;
  buttons?: AlertButton[];
}

export function useThemedAlert() {
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title?: string;
    message?: string;
    buttons?: AlertButton[];
  }>({
    visible: false,
  });

  const showAlert = (
    title: string,
    message?: string,
    buttons?: AlertButton[]
  ) => {
    setAlertConfig({
      visible: true,
      title,
      message,
      buttons: buttons || [{ text: "OK" }],
    });
  };

  const hideAlert = () => {
    setAlertConfig((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  return {
    alertConfig,
    showAlert,
    hideAlert,
  };
}
