import React from "react";
import { TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
}

export function SettingItem({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showArrow = true,
}: SettingItemProps) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity
      className="flex-row items-center justify-between py-4 px-4 border-b-[0.5px] rounded-xl mb-0.5"
      style={{ borderBottomColor: Colors[colorScheme ?? "light"].icon + "50" }}
      onPress={onPress}
    >
      <ThemedView className="flex-row items-center flex-1">
        <View className="w-9 h-9 rounded-lg items-center justify-center mr-3 bg-primary-50">
          <IconSymbol name={icon as any} size={20} color="#0ea5e9" />
        </View>
        <ThemedView className="flex-1">
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
          {subtitle && (
            <ThemedText className="text-xs opacity-60 mt-0.5">
              {subtitle}
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
      <ThemedView className="flex-row items-center gap-2.5">
        {rightElement}
        {showArrow && (
          <IconSymbol
            name="chevron.right"
            size={16}
            color={Colors[colorScheme ?? "light"].icon}
          />
        )}
      </ThemedView>
    </TouchableOpacity>
  );
}
