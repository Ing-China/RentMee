import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@lingui/core/macro";
import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedButton } from "./ThemedButton";

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

interface ThemedAlertProps {
  visible: boolean;
  title?: string;
  message?: string;
  buttons?: AlertButton[];
  onDismiss?: () => void;
}

const { width: screenWidth } = Dimensions.get("window");

export function ThemedAlert({
  visible,
  title,
  message,
  buttons = [{ text: t`OK` }],
  onDismiss,
}: ThemedAlertProps) {
  const { colors } = useTheme();

  const handleButtonPress = (button: AlertButton) => {
    if (button.onPress) {
      button.onPress();
    }
    if (onDismiss) {
      onDismiss();
    }
  };

  const handleBackdropPress = () => {
    // Only dismiss if there's a cancel button
    const cancelButton = buttons.find((btn) => btn.style === "cancel");
    if (cancelButton) {
      handleButtonPress(cancelButton);
    }
  };

  const getButtonVariant = (style?: string) => {
    switch (style) {
      case "destructive":
        return "outline";
      case "cancel":
        return "secondary";
      default:
        return "primary";
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View
          style={[styles.overlay, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={[
                styles.alertContainer,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.icon + "30",
                },
              ]}
            >
              {/* Title */}
              {title && (
                <ThemedText
                  type="defaultSemiBold"
                  style={[styles.title, { color: colors.text }]}
                >
                  {title}
                </ThemedText>
              )}

              {/* Message */}
              {message && (
                <ThemedText
                  style={[
                    styles.message,
                    { color: colors.text + "CC", marginTop: title ? 8 : 0 },
                  ]}
                >
                  {message}
                </ThemedText>
              )}

              {/* Buttons */}
              <View style={styles.buttonsContainer}>
                {buttons.map((button, index) => {
                  const isDestructive = button.style === "destructive";
                  return isDestructive ? (
                    // Custom destructive button with red text
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleButtonPress(button)}
                      style={[
                        styles.button,
                        buttons.length === 1 ? styles.singleButton : {},
                        {
                          flex: 1,
                          marginLeft: index > 0 ? 8 : 0,
                          borderWidth: 1,
                          borderColor: "#ff3b30",
                          borderRadius: 12,
                          backgroundColor: "transparent",
                          paddingVertical: 14,
                          paddingHorizontal: 20,
                          alignItems: "center",
                          justifyContent: "center",
                        },
                      ]}
                    >
                      <ThemedText
                        type="defaultSemiBold"
                        style={{
                          color: "#ff3b30",
                          fontSize: 16,
                        }}
                      >
                        {button.text}
                      </ThemedText>
                    </TouchableOpacity>
                  ) : (
                    <ThemedButton
                      key={index}
                      title={button.text}
                      variant={getButtonVariant(button.style)}
                      size="medium"
                      onPress={() => handleButtonPress(button)}
                      style={[
                        styles.button,
                        buttons.length === 1 ? styles.singleButton : {},
                        {
                          flex: 1,
                          marginLeft: index > 0 ? 8 : 0,
                        },
                      ]}
                    />
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
  },
  alertContainer: {
    width: Math.min(screenWidth - 100, 320),
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  button: {
    minHeight: 44,
  },
  singleButton: {
    alignSelf: "center",
    minWidth: 100,
  },
});
