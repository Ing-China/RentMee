import {
  ApiError,
  ApiResponse,
  AuthSession,
  LoginCredentials,
  LoginResponse,
} from "@/types/api";
import { storage } from "./storage";

const BASE_URL = "https://roomrental.store/api/v1";

export class ApiClient {
  private baseUrl: string;
  private authToken: string | null = null;
  private maxRetries = 3;
  private retryDelay = 1000;

  constructor() {
    this.baseUrl = BASE_URL;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    context: string
  ): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await operation();
        return result;
      } catch (error: unknown) {
        lastError = error;
        const errMsg = (error as Error)?.message || String(error);
        console.warn(`${context} attempt ${attempt + 1} failed:`, errMsg);

        // Don't retry on authentication errors
        if (
          (error as { status?: number; message?: string }).status === 401 ||
          (error as { message?: string }).message?.includes("authentication")
        ) {
          throw error;
        }

        // Don't retry on client errors (4xx except 401, 408, 429)
        if (
          (error as { status?: number }).status !== undefined &&
          (error as { status: number }).status >= 400 &&
          (error as { status: number }).status < 500 &&
          (error as { status: number }).status !== 408 &&
          (error as { status: number }).status !== 429
        ) {
          throw error;
        }

        // If this is the last attempt, throw the error
        if (attempt === this.maxRetries) {
          throw error;
        }

        // Calculate exponential backoff delay
        const delayMs =
          this.retryDelay * Math.pow(2, attempt) + Math.random() * 1000;
        console.log(`Retrying ${context} in ${delayMs}ms...`);
        await this.delay(delayMs);
      }
    }
    throw lastError;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (this.authToken) {
      defaultHeaders.Authorization = `Bearer ${this.authToken}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || "Request failed",
          ...data,
        };
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  async initializeFromStorage(): Promise<boolean> {
    try {
      const session = await storage.getAuthSession();
      if (session) {
        this.authToken = session.token;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to initialize from storage:", error);
      await storage.clearAuthSession();
      return false;
    }
  }

  async login(credentials: LoginCredentials): Promise<{
    success: boolean;
    data?: LoginResponse;
    error?: string;
  }> {
    try {
      const response = await this.retryWithBackoff(
        () =>
          this.makeRequest<LoginResponse>("/landlord/login", {
            method: "POST",
            body: JSON.stringify(credentials),
          }),
        "Landlord Login"
      );

      if (response.success && response.data) {
        this.authToken = response.data.token;

        // Save session data to storage
        const sessionData: AuthSession = {
          user: response.data.user,
          token: response.data.token,
        };

        await storage.saveAuthSession(sessionData);
        await storage.saveUserProfile(response.data.user);

        return { success: true, data: response.data };
      }

      return { success: false, error: response.message || "Login failed" };
    } catch (error: unknown) {
      console.error("Login failed:", error);
      const err = error as ApiError;
      return {
        success: false,
        error: err.message || "Login failed. Please try again.",
      };
    }
  }

  async getProfile(): Promise<{
    success: boolean;
    data?: User;
    error?: string;
  }> {
    try {
      if (!this.authToken) {
        throw new Error("Not authenticated");
      }

      const response = await this.retryWithBackoff(
        () =>
          this.makeRequest<User>("/landlord/profile", {
            method: "GET",
          }),
        "Get Profile"
      );

      if (response.success && response.data) {
        // Update cached profile
        await storage.saveUserProfile(response.data);
        return { success: true, data: response.data };
      }

      return {
        success: false,
        error: response.message || "Failed to get profile",
      };
    } catch (error: unknown) {
      console.error("Get profile failed:", error);
      const err = error as ApiError;

      // If unauthorized, clear auth data
      if (err.status === 401 || err.status === 403) {
        this.authToken = null;
        await storage.clearAuthSession();
        await storage.clearUserProfile();
      }

      return {
        success: false,
        error: err.message || "Failed to get profile",
      };
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint to invalidate token on server
      if (this.authToken) {
        await this.retryWithBackoff(
          () => this.makeRequest("/landlord/logout", { method: "POST" }),
          "Logout"
        );
      }
    } catch (error) {
      console.error("Logout API call failed:", error);
      // Continue with local cleanup even if API call fails
    } finally {
      // Always clear local data
      this.authToken = null;
      await storage.clearAuthSession();
      await storage.clearUserProfile();
    }
  }

  isAuthenticated(): boolean {
    return !!this.authToken;
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

}

export const apiClient = new ApiClient();
