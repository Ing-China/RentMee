// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolViewProps, SymbolWeight } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialIcons>["name"]
>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chart.bar.fill": "bar-chart",
  "person.2.fill": "people",
  "dollarsign.circle.fill": "attach-money",
  "gearshape.fill": "settings",
  "person.circle.fill": "account-circle",
  "creditcard.fill": "credit-card",
  "bell.fill": "notifications",
  "moon.fill": "nightlight-round",
  "icloud.fill": "cloud",
  "lock.fill": "lock",
  "arrow.down.doc.fill": "download",
  "trash.fill": "delete",
  "questionmark.circle.fill": "help",
  "star.fill": "star",
  "info.circle.fill": "info",
  power: "power-settings-new",
  // Missing mappings for appearance screen
  gear: "settings",
  "sun.max.fill": "wb-sunny", // Better light theme icon
  globe: "language",
  // Login screen icons
  "envelope.fill": "email",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name];
  
  // Fallback to default icon if mapping is missing
  if (!iconName) {
    console.warn(`IconSymbol: No mapping found for "${name}". Using default icon.`);
    return (
      <MaterialIcons
        color={color}
        size={size}
        name="help-outline"
        style={style}
      />
    );
  }

  return (
    <MaterialIcons
      color={color}
      size={size}
      name={iconName}
      style={style}
    />
  );
}
