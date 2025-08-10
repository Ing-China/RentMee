import { t } from "@lingui/core/macro";
import { Tabs } from "expo-router";
import React, { useMemo } from "react";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";

export default function TabLayout() {
  const { colors } = useTheme();
  const { locale } = useI18n();

  const tabBarLabelStyle = useMemo(() => {
    return {
      fontFamily:
        locale === "km" ? "KantumruyPro_500Medium" : "Roboto_500Medium",
      fontSize: 12,
    };
  }, [locale]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: tabBarLabelStyle,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t`Dashboard`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="chart.bar.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: t`Properties`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tenants"
        options={{
          title: t`Tenants`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.2.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finances"
        options={{
          title: t`Finances`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="dollarsign.circle.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t`Settings`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
