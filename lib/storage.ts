import { LocalizCode } from "@/i18n/config";
import { ThemeMode } from "@/theme/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGE_KEY = "@language_preference";
const THEME_KEY = "@theme_preference";

export const storage = {
  async getLanguage(): Promise<LocalizCode | null> {
    try {
      const language = await AsyncStorage.getItem(LANGUAGE_KEY);
      return language as LocalizCode | null;
    } catch (error) {
      console.error("Failed to get language from storage:", error);
      return null;
    }
  },

  async setLanguage(language: LocalizCode): Promise<void> {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error("Failed to save language to storage:", error);
    }
  },

  async removeLanguage(): Promise<void> {
    try {
      await AsyncStorage.removeItem(LANGUAGE_KEY);
    } catch (error) {
      console.error("Failed to remove language from storage:", error);
    }
  },

  // Theme storage methods
  async getTheme(): Promise<ThemeMode | null> {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      return theme as ThemeMode | null;
    } catch (error) {
      console.error("Failed to get theme from storage:", error);
      return null;
    }
  },

  async setTheme(theme: ThemeMode): Promise<void> {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.error("Failed to save theme to storage:", error);
    }
  },

  async removeTheme(): Promise<void> {
    try {
      await AsyncStorage.removeItem(THEME_KEY);
    } catch (error) {
      console.error("Failed to remove theme from storage:", error);
    }
  },
};
