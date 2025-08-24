import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { I18nProviderWrapper } from "@/contexts/I18nContext";
import { ThemeProviderWrapper, useTheme } from "@/contexts/ThemeContext";
import { router, useSegments } from "expo-router";
import { useEffect } from "react";

function AppContent() {
  const { colorScheme, colors } = useTheme();
  const { isAuthenticated, loading } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return; // Don't redirect while loading

    const inAuthGroup = segments[0] === "(auth)";

    if (isAuthenticated && inAuthGroup) {
      // Redirect to dashboard if authenticated and in auth group
      router.replace("/(tabs)/dashboard");
    } else if (!isAuthenticated && !inAuthGroup) {
      // Redirect to login if not authenticated and not in auth group
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, loading, segments]);

  return (
    <NavigationThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* True Nested Stack - Completely separate from tabs */}
        <Stack.Screen
          name="settings-stack/appearance"
          options={{
            title: "Appearance",
            headerShown: true,
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            headerBackButtonDisplayMode: "minimal",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="settings-stack/language"
          options={{
            title: "Language",
            headerShown: true,
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            headerBackButtonDisplayMode: "minimal",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="settings-stack/profile"
          options={{
            title: "Profile",
            headerShown: true,
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            headerBackButtonDisplayMode: "minimal",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="settings-stack/edit-profile"
          options={{
            title: "Edit Profile",
            headerShown: true,
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            headerBackButtonDisplayMode: "minimal",
            presentation: "card",
          }}
        />
        <Stack.Screen
          name="settings-stack/change-password"
          options={{
            title: "Change Password",
            headerShown: true,
            headerTintColor: colorScheme === "dark" ? "#fff" : "#000",
            headerBackButtonDisplayMode: "minimal",
            presentation: "card",
          }}
        />
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
