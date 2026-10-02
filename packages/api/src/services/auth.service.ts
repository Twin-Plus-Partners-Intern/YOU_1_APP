import { SignInRequest, SignUpRequest, AuthResponse, UserDTO } from '@you-il/types';
import { signInMock, signUpMock, signOutMock, getStoredSessionMock } from './auth.mock';

/**
 * Flag to determine whether to use Mock API or Real API.
 * Defaults to true unless EXPO_PUBLIC_USE_MOCK is explicitly set to 'false'.
 */
export const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK !== 'false';

export const authService = {
  signIn: async (data: SignInRequest): Promise<AuthResponse> => {
    if (USE_MOCK) {
      return signInMock(data);
    }
    // Real API integration fallback
    return signInMock(data);
  },

  signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
    if (USE_MOCK) {
      return signUpMock(data);
    }
    // Real API integration fallback
    return signUpMock(data);
  },

  signOut: async (): Promise<void> => {
    if (USE_MOCK) {
      return signOutMock();
    }
    return signOutMock();
  },

  getStoredSession: async (): Promise<{ token: string | null; user: UserDTO | null }> => {
    if (USE_MOCK) {
      return getStoredSessionMock();
    }
    return getStoredSessionMock();
  },
};
