import { useI18n } from "@/contexts/I18nContext";
import { useTheme } from "@/contexts/ThemeContext";
import { t } from "@lingui/core/macro";
import { Stack } from "expo-router";
import { useMemo } from "react";

export default function SettingsLayout() {
  const { colorScheme } = useTheme();
  const { locale } = useI18n();

  // Font family for headers based on locale
  const headerFontFamily = useMemo(() => {
    return locale === "km" ? "KantumruyPro_600SemiBold" : undefined;
  }, [locale]);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="appearance"
        options={{
          title: t`Appearance`,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            fontFamily: headerFontFamily,
          },
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          title: t`Language`,
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            fontFamily: headerFontFamily,
          },
        }}
      />
    </Stack>
  );
}
