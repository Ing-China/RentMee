import { Colors } from "@/constants/Colors";

export type ThemeMode = "light" | "dark" | "system";
export type ColorScheme = "light" | "dark";

export const detectColorScheme = (): ColorScheme => {
  // This function will be called within a component context
  // where useColorScheme hook is available
  return "light"; // fallback
};

export const getEffectiveColorScheme = (
  themeMode: ThemeMode,
  systemColorScheme: ColorScheme
): ColorScheme => {
  return themeMode === "system" ? systemColorScheme : themeMode;
};

export const getThemeColors = (colorScheme: ColorScheme) => {
  return Colors[colorScheme];
};
