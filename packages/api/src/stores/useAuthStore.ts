import { create } from 'zustand';
import { UserDTO, SignInRequest, SignUpRequest } from '@you-il/types';
import { authService, USE_MOCK } from '../services/auth.service';

export interface AuthState {
  user: UserDTO | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
  useMock: boolean;

  // Actions
  signIn: (data: SignInRequest) => Promise<boolean>;
  signUp: (data: SignUpRequest) => Promise<boolean>;
  signOut: () => Promise<void>;
  loadSession: () => Promise<void>;
  checkAuthSession: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,
  useMock: USE_MOCK,

  signIn: async (credentials: SignInRequest): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.signIn(credentials);
      set({
        user: response.user,
        token: response.accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Đăng nhập thất bại. Vui lòng thử lại.';
      set({
        isLoading: false,
        error: errorMessage,
      });
      return false;
    }
  },

  signUp: async (data: SignUpRequest): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.signUp(data);
      set({
        user: response.user,
        token: response.accessToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Đăng ký thất bại. Vui lòng thử lại.';
      set({
        isLoading: false,
        error: errorMessage,
      });
      return false;
    }
  },

  signOut: async (): Promise<void> => {
    set({ isLoading: true });
    try {
      await authService.signOut();
    } catch {
      // Ignore cleanup error
    } finally {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  loadSession: async (): Promise<void> => {
    set({ isInitializing: true });
    try {
      const { token, user } = await authService.getStoredSession();
      if (token && user) {
        set({
          token,
          user,
          isAuthenticated: true,
          isInitializing: false,
        });
      } else {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isInitializing: false,
        });
      }
    } catch {
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isInitializing: false,
      });
    }
  },

  checkAuthSession: async (): Promise<void> => {
    return get().loadSession();
  },

  clearError: (): void => {
    set({ error: null });
  },
}));
