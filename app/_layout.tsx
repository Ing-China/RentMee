import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { I18nProviderWrapper } from "@/contexts/I18nContext";
import { ThemeProviderWrapper, useTheme } from "@/contexts/ThemeContext";

function AppContent() {
  const { colorScheme, colors } = useTheme();

  return (
    <NavigationThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colors.background}
        translucent={false}
      />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <I18nProviderWrapper>
      <ThemeProviderWrapper>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProviderWrapper>
    </I18nProviderWrapper>
  );
}
