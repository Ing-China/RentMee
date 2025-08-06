import { useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const { colorScheme } = useTheme();

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
          title: "Appearance",
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        }}
      />
      <Stack.Screen
        name="language"
        options={{
          title: "Language",
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
        }}
      />
    </Stack>
  );
}
