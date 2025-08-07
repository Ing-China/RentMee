import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useTheme } from "@/contexts/ThemeContext";

export interface SettingItemProps {
  icon: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
  isLast?: boolean;
}

export function SettingItem({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showArrow = true,
  isLast = false,
}: SettingItemProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderBottomColor: colors.icon + "50",
          borderBottomWidth: !isLast ? 0.5 : 0,
        },
      ]}
      onPress={onPress}
    >
      <ThemedView style={styles.contentContainer}>
        <ThemedView
          style={[
            styles.iconContainer,
            { backgroundColor: colors.icon + "20" },
          ]}
        >
          <IconSymbol name={icon as any} size={20} color={colors.tint} />
        </ThemedView>
        <ThemedView style={styles.textContainer}>
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
          {subtitle && (
            <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
          )}
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.rightContainer}>
        {rightElement}
        {showArrow && (
          <IconSymbol name="chevron.right" size={16} color={colors.icon} />
        )}
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 2,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
