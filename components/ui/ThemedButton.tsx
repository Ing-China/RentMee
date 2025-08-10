import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "./IconSymbol";

interface ThemedButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "destructive";
  icon?: string;
  loading?: boolean;
  size?: "small" | "medium" | "large";
}

export function ThemedButton({
  title,
  variant = "primary",
  icon,
  loading = false,
  size = "medium",
  style,
  disabled,
  ...props
}: ThemedButtonProps) {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      borderRadius: 12,
      gap: 8,
    };

    const sizeStyles = {
      small: { paddingVertical: 10, paddingHorizontal: 16 },
      medium: { paddingVertical: 14, paddingHorizontal: 20 },
      large: { paddingVertical: 16, paddingHorizontal: 24 },
    };

    const variantStyles = {
      primary: {
        backgroundColor: colors.tint,
      },
      secondary: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.icon,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.tint,
      },
      destructive: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#ff3b30",
      },
    };

    return [baseStyle, sizeStyles[size], variantStyles[variant]];
  };

  const getTextColor = () => {
    switch (variant) {
      case "primary":
        // In dark mode, tint is white, so we need black text for contrast
        // In light mode, tint is blue, so we need white text
        return colors.tint === "#fff" ? "#000000" : "#ffffff";
      case "secondary":
        return colors.text;
      case "outline":
        return colors.tint;
      case "destructive":
        return "#ff3b30";
      default:
        return colors.text;
    }
  };

  const getTextWeight = () => {
    switch (size) {
      case "small":
        return "default" as const;
      case "medium":
        return "defaultSemiBold" as const;
      case "large":
        return "defaultSemiBold" as const;
      default:
        return "defaultSemiBold" as const;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        {
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {loading && <ActivityIndicator size="small" color={getTextColor()} />}

      {!loading && icon && (
        <IconSymbol name={icon} size={18} color={getTextColor()} />
      )}

      {!loading && (
        <ThemedText
          type={getTextWeight()}
          style={{
            color: getTextColor(),
            fontSize: size === "small" ? 14 : 16,
          }}
        >
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}
