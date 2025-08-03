import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

export default function SettingsLayout() {
  const colorScheme = useColorScheme();

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
    </Stack>
  );
}
