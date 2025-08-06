import { View, type ViewProps } from "react-native";

import { useTheme } from "@/contexts/ThemeContext";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { colors, colorScheme } = useTheme();
  const backgroundColor = lightColor && colorScheme === 'light'
    ? lightColor
    : darkColor && colorScheme === 'dark'
    ? darkColor
    : colors.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
