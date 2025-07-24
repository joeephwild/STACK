// Define custom LoginPayload interface for thirdweb v5 compatibility
export interface LoginPayload {
  domain: string;
  address: string;
  statement?: string;
  uri?: string;
  version?: string;
  chainId?: number;
  nonce: string;
  issuedAt: string;
  expirationTime?: string;
  notBefore?: string;
  resources?: string[];
}

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001/api';
const AUTH_API_URL = process.env.EXPO_PUBLIC_AUTH_API || 'http://localhost:3001/api/auth';

export interface User {
  id: string;
  walletAddress?: string;
  email: string;
  displayName?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  nationality?: string;
  profilePicture?: string;
  referralCode?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message?: string;
  token?: string;
}

export interface EmailSignupData {
  email: string;
  password: string;
  displayName: string;
  phoneNumber?: string;
  nationality?: string;
  referralCode?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  phoneNumber: string | undefined;
  nationality: string;
  referralCode?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface ResendVerificationData {
  email: string;
}

class ApiClient {
  private baseUrl: string;
  private authUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
    this.authUrl = AUTH_API_URL;
  }

  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Authentication methods
  async getLoginPayload(address: string): Promise<LoginPayload> {
    return this.request<LoginPayload>(`${this.authUrl}/login?address=${address}`);
  }

  async login(payload: LoginPayload, signature: string): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${this.authUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ payload, signature }),
    });
  }

  async loginWithEmail(data: LoginData): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${this.authUrl}/login/email`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async signupWithEmail(data: EmailSignupData): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${this.authUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyEmail(data: VerifyEmailData): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${this.authUrl}/verify-email`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resendVerification(data: ResendVerificationData): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`${this.authUrl}/resend-verification`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${this.authUrl}/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getAuthStatus(): Promise<AuthResponse> {
    return this.request<AuthResponse>(`${this.authUrl}/status`);
  }

  async logout(): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`${this.authUrl}/logout`, {
      method: 'POST',
    });
  }

  async forgotPassword(data: ForgotPasswordData): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`${this.authUrl}/forgot-password`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async resetPassword(data: ResetPasswordData): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`${this.authUrl}/reset-password`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // User methods
  async getCurrentUser(): Promise<User> {
    return this.request<User>(`${this.baseUrl}/users/me`);
  }

  async getUserByWallet(walletAddress: string): Promise<User> {
    return this.request<User>(`${this.baseUrl}/users/${walletAddress}`);
  }

  async updateUser(walletAddress: string, data: Partial<User>): Promise<User> {
    return this.request<User>(`${this.baseUrl}/users/${walletAddress}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getUserStats(walletAddress: string): Promise<any> {
    return this.request<any>(`${this.baseUrl}/users/${walletAddress}/stats`);
  }
}

export const apiClient = new ApiClient();
