import { LocalizCode } from "@/i18n/config";
import { ThemeMode } from "@/theme/config";
import { AuthSession, User } from "@/types/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LANGUAGE_KEY = "@language_preference";
const THEME_KEY = "@theme_preference";
const AUTH_SESSION_KEY = "@auth_session";
const USER_PROFILE_KEY = "@user_profile";

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

  // Auth session methods
  async saveAuthSession(session: AuthSession): Promise<void> {
    try {
      const sessionData = JSON.stringify(session);
      await AsyncStorage.setItem(AUTH_SESSION_KEY, sessionData);
    } catch (error) {
      console.error("Failed to save auth session:", error);
    }
  },

  async getAuthSession(): Promise<AuthSession | null> {
    try {
      const sessionData = await AsyncStorage.getItem(AUTH_SESSION_KEY);
      if (sessionData) {
        return JSON.parse(sessionData);
      }
      return null;
    } catch (error) {
      console.error("Failed to get auth session:", error);
      return null;
    }
  },

  async clearAuthSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem(AUTH_SESSION_KEY);
    } catch (error) {
      console.error("Failed to clear auth session:", error);
    }
  },

  // User profile methods
  async saveUserProfile(profile: User): Promise<void> {
    try {
      const profileData = JSON.stringify(profile);
      await AsyncStorage.setItem(USER_PROFILE_KEY, profileData);
    } catch (error) {
      console.error("Failed to save user profile:", error);
    }
  },

  async getUserProfile(): Promise<User | null> {
    try {
      const profileData = await AsyncStorage.getItem(USER_PROFILE_KEY);
      if (profileData) {
        return JSON.parse(profileData);
      }
      return null;
    } catch (error) {
      console.error("Failed to get user profile:", error);
      return null;
    }
  },

  async clearUserProfile(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_PROFILE_KEY);
    } catch (error) {
      console.error("Failed to clear user profile:", error);
    }
  },

  // Clear all auth-related data
  async clearAll(): Promise<void> {
    await Promise.all([
      this.clearAuthSession(), 
      this.clearUserProfile()
      // Note: We don't clear settings (language/theme) on logout
    ]);
  },
};
