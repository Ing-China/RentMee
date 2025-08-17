import { ThemedView } from "@/components/ThemedView";
import { apiClient } from "@/lib/api";
import { storage } from "@/lib/storage";
import { LoginCredentials, User } from "@/types/api";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator } from "react-native";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const initializeAuth = useCallback(async () => {
    try {
      setLoading(true);
      const sessionRestored = await apiClient.initializeFromStorage();

      if (sessionRestored) {
        setIsAuthenticated(true);

        const cachedProfile = await storage.getUserProfile();
        if (cachedProfile) {
          setUser(cachedProfile);
        }

        // Verify session is still valid and refresh profile
        await refreshUserProfile();
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      await storage.clearAll();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const refreshUserProfile = async () => {
    try {
      // First try to get fresh data from API
      const profileResult = await apiClient.getProfile();
      if (profileResult.success && profileResult.data) {
        setUser(profileResult.data);
        return;
      }

      // If API fails, fall back to cached data
      const cachedProfile = await storage.getUserProfile();
      if (cachedProfile) {
        setUser(cachedProfile);
      }
    } catch (error) {
      console.error("Failed to refresh user profile:", error);

      // Still try cached data on error
      try {
        const cachedProfile = await storage.getUserProfile();
        if (cachedProfile) {
          setUser(cachedProfile);
        }
      } catch (cacheError) {
        console.error("Failed to get cached profile:", cacheError);
      }
    }
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const result = await apiClient.login(credentials);

      if (result.success && result.data) {
        setIsAuthenticated(true);
        setUser(result.data.user);

        // Refresh user profile to get the latest data
        try {
          await refreshUserProfile();
        } catch (profileError) {
          console.error("Failed to refresh profile after login:", profileError);
          // Don't fail login if profile refresh fails
        }

        return { success: true };
      }

      return { success: false, error: result.error };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Login failed. Please try again." };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await refreshUserProfile();
  }, []);

  if (loading) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
