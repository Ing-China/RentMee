import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";
import { Platform, TextInput, TextInputProps, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "./IconSymbol";

interface ThemedTextInputProps extends TextInputProps {
  label?: string;
  icon?: string;
  error?: string;
  containerStyle?: any;
}

export function ThemedTextInput({
  label,
  icon,
  error,
  containerStyle,
  style,
  ...props
}: ThemedTextInputProps) {
  const { colors } = useTheme();
  const { locale } = useI18n();

  const fontFamily =
    locale === "km" ? "KantumruyPro_400Regular" : "Roboto_400Regular";

  return (
    <View style={[{ marginBottom: 16 }, containerStyle]}>
      {label && (
        <ThemedText
          style={{
            marginBottom: 8,
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          {label}
        </ThemedText>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.background,
          borderWidth: 1,
          borderColor: error ? "#ff3b30" : colors.icon,
          borderRadius: 12,
          paddingHorizontal: 16,
          paddingVertical: Platform.OS === "ios" ? 14 : 12,
          minHeight: Platform.OS === "android" ? 48 : undefined,
        }}
      >
        {icon && (
          <IconSymbol
            name={icon}
            size={20}
            color={colors.icon}
            style={{ marginRight: 12 }}
          />
        )}

        <TextInput
          style={[
            {
              flex: 1,
              fontFamily,
              fontSize: 16,
              color: colors.text,
              paddingVertical: 0, // Remove default padding to prevent extra height
            },
            style,
          ]}
          placeholderTextColor={error ? "#ff3b30" : colors.icon}
          {...props}
        />
      </View>
    </View>
  );
}
