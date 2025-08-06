import { useMemo } from "react";
import { StyleSheet, Text, type TextProps } from "react-native";

import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const { colors, colorScheme } = useTheme();
  const { locale } = useI18n();

  const color =
    lightColor && colorScheme === "light"
      ? lightColor
      : darkColor && colorScheme === "dark"
        ? darkColor
        : colors.text;

  // Font constants for better maintainability
  const FONTS = {
    km: {
      regular: "KantumruyPro-Regular",
      semiBold: "KantumruyPro-SemiBold",
      bold: "KantumruyPro-Bold",
    },
    en: {
      regular: undefined, // System default
      semiBold: undefined,
      bold: undefined,
    },
  } as const;

  // Memoized font selection for better performance
  const fontFamily = useMemo(() => {
    const fontSet = FONTS[locale] || FONTS.en;

    switch (type) {
      case "title":
      case "subtitle":
        return fontSet.bold;
      case "defaultSemiBold":
        return fontSet.semiBold;
      default:
        return fontSet.regular;
    }
  }, [locale, type]);

  return (
    <Text
      style={[
        { color, fontFamily },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
