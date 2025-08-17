// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  user_type?: string;
  roles: string[];
  address?: string | null;
  telegram_id?: string | null;
  properties_count?: number;
  tenants_count?: number;
  active_contracts?: number;
  total_revenue?: number;
  avatar?: string;
  image_url?: string;
  preferred_currency?: string | null;
  permissions?: string[];
  created_at: string;
  updated_at?: string;
}

// Auth Types
export interface AuthSession {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  device_name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Error Types
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
