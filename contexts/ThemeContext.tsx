import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import {
  ThemeMode,
  ColorScheme,
  getEffectiveColorScheme,
  getThemeColors,
} from "@/theme/config";
import { storage } from "@/lib/storage";
import { Colors } from "@/constants/Colors";

type ThemeContextType = {
  theme: ThemeMode;
  colorScheme: ColorScheme;
  colors: typeof Colors.light;
  changeTheme: (newTheme: ThemeMode) => Promise<void>;
  isLoading: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  colorScheme: "light",
  colors: Colors.light,
  changeTheme: async () => {},
  isLoading: true,
});

export const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [isLoading, setIsLoading] = useState(true);
  const systemColorScheme = useColorScheme() ?? "light";

  const colorScheme = getEffectiveColorScheme(theme, systemColorScheme);
  const colors = getThemeColors(colorScheme);

  useEffect(() => {
    const initTheme = async () => {
      try {
        const savedTheme = await storage.getTheme();
        if (savedTheme) {
          setTheme(savedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initTheme();
  }, []);

  // Update theme when system theme changes (only if using system theme)
  useEffect(() => {
    if (theme === "system") {
      // Force re-render when system theme changes
      console.log("System theme changed to:", systemColorScheme);
    }
  }, [systemColorScheme, theme]);

  const changeTheme = useCallback(
    async (newTheme: ThemeMode) => {
      console.log("Changing theme from", theme, "to", newTheme);
      if (theme === newTheme) return;

      try {
        setTheme(newTheme);
        await storage.setTheme(newTheme);
        console.log("Theme changed successfully to:", newTheme);
      } catch (error) {
        console.error("Failed to change theme:", error);
        // Revert theme on error
        setTheme(theme);
      }
    },
    [theme]
  );

  if (isLoading) return null;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        colors,
        changeTheme,
        isLoading,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProviderWrapper");
  }
  return context;
};