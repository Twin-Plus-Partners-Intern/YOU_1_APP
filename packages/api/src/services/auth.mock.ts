import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import {
  SignInRequest,
  SignUpRequest,
  UserDTO,
  AuthResponse,
  StoredUserRecord,
} from '@you-il/types';

// Standard Mock Storage Keys
const MOCK_USERS_DB_KEY = '@mock_users_db';
const AUTH_TOKEN_KEY = '@auth_token';
const AUTH_USER_KEY = '@auth_user';

// Helper delay simulating network latency
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

// Persistent in-memory global cache surviving Metro Fast Refresh
declare global {
  // eslint-disable-next-line no-var
  var __MOCK_USERS_DB__: StoredUserRecord[] | undefined;
}

function getGlobalUsersCache(): StoredUserRecord[] | null {
  if (typeof globalThis !== 'undefined' && Array.isArray(globalThis.__MOCK_USERS_DB__)) {
    return globalThis.__MOCK_USERS_DB__;
  }
  return null;
}

function setGlobalUsersCache(users: StoredUserRecord[]): void {
  if (typeof globalThis !== 'undefined') {
    globalThis.__MOCK_USERS_DB__ = users;
  }
}

/**
 * Pure SHA-256 Hash Implementation for Cross-Platform Compatibility
 */
function sha256Sync(ascii: string): string {
  let i: number, j: number;
  let result = '';

  const words: number[] = [];
  const asciiBitLength = ascii.length * 8;

  const hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];

  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  for (i = 0; i < ascii.length; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - (i % 4)) * 8);
  }
  words[asciiBitLength >> 5] |= 0x80 << ((3 - ((asciiBitLength >> 3) % 4)) * 8);
  words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;

  for (i = 0; i < words.length; i += 16) {
    const w = words.slice(i, i + 16);
    const oldHash = hash.slice(0);

    for (j = 0; j < 64; j++) {
      const w15 = w[j - 15],
        w2 = w[j - 2];

      const s0 = ((w15 >>> 7) | (w15 << 25)) ^ ((w15 >>> 18) | (w15 << 14)) ^ (w15 >>> 3);
      const s1 = ((w2 >>> 17) | (w2 << 15)) ^ ((w2 >>> 19) | (w2 << 13)) ^ (w2 >>> 10);
      w[j] = j < 16 ? w[j] : (w[j - 16] + s0 + w[j - 7] + s1) | 0;

      const ch = (hash[4] & hash[5]) ^ (~hash[4] & hash[6]);
      const maj = (hash[0] & hash[1]) ^ (hash[0] & hash[2]) ^ (hash[1] & hash[2]);

      const s0_h =
        ((hash[0] >>> 2) | (hash[0] << 30)) ^
        ((hash[0] >>> 13) | (hash[0] << 19)) ^
        ((hash[0] >>> 22) | (hash[0] << 10));
      const s1_h =
        ((hash[4] >>> 6) | (hash[4] << 26)) ^
        ((hash[4] >>> 11) | (hash[4] << 21)) ^
        ((hash[4] >>> 25) | (hash[4] << 7));

      const temp1 = hash[7] + s1_h + ch + k[j] + w[j];
      const temp2 = s0_h + maj;

      hash[7] = hash[6];
      hash[6] = hash[5];
      hash[5] = hash[4];
      hash[4] = (hash[3] + temp1) | 0;
      hash[3] = hash[2];
      hash[2] = hash[1];
      hash[1] = hash[0];
      hash[0] = (temp1 + temp2) | 0;
    }

    for (j = 0; j < 8; j++) {
      hash[j] = (hash[j] + oldHash[j]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

/**
 * Deterministic SHA-256 Password Hash Helper using expo-crypto
 */
export const hashPassword = async (password: string): Promise<string> => {
  const cleanPassword = password ? password.trim() : '';
  try {
    if (Crypto && typeof Crypto.digestStringAsync === 'function') {
      return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, cleanPassword, {
        encoding: Crypto.CryptoEncoding.HEX,
      });
    }
  } catch {
    // Fallback to sha256Sync
  }
  return sha256Sync(cleanPassword);
};

// Safe Storage Wrapper handling Native module is null error gracefully
const safeStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const val = await AsyncStorage.getItem(key);
      if (val !== null) return val;
    } catch {
      // Native module is null or legacy storage error
    }
    try {
      const g = globalThis as unknown as {
        localStorage?: { getItem: (k: string) => string | null };
      };
      if (g.localStorage) {
        return g.localStorage.getItem(key);
      }
    } catch {
      // Ignore
    }
    if (typeof globalThis !== 'undefined') {
      const memMap = (globalThis as Record<string, unknown>).__SAFE_MEM_STORAGE__ as
        Record<string, string> | undefined;
      return memMap?.[key] || null;
    }
    return null;
  },

  setItem: async (key: string, value: string): Promise<void> => {
    if (typeof globalThis !== 'undefined') {
      const target = globalThis as Record<string, unknown>;
      if (!target.__SAFE_MEM_STORAGE__) {
        target.__SAFE_MEM_STORAGE__ = {};
      }
      (target.__SAFE_MEM_STORAGE__ as Record<string, string>)[key] = value;
    }
    try {
      const g = globalThis as unknown as {
        localStorage?: { setItem: (k: string, v: string) => void };
      };
      if (g.localStorage) {
        g.localStorage.setItem(key, value);
      }
    } catch {
      // Ignore
    }
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      // Ignore Native module is null
    }
  },

  removeItem: async (key: string): Promise<void> => {
    if (typeof globalThis !== 'undefined') {
      const target = globalThis as Record<string, unknown>;
      if (target.__SAFE_MEM_STORAGE__) {
        delete (target.__SAFE_MEM_STORAGE__ as Record<string, string>)[key];
      }
    }
    try {
      const g = globalThis as unknown as { localStorage?: { removeItem: (k: string) => void } };
      if (g.localStorage) {
        g.localStorage.removeItem(key);
      }
    } catch {
      // Ignore
    }
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // Ignore
    }
  },
};

/**
 * Get stored users list from safeStorage database `@mock_users_db`
 */
async function getStoredUsers(): Promise<StoredUserRecord[]> {
  const cachedUsers = getGlobalUsersCache();
  if (cachedUsers && cachedUsers.length > 0) {
    return cachedUsers;
  }

  try {
    const data = await safeStorage.getItem(MOCK_USERS_DB_KEY);
    if (!data) {
      const defaultPasswordHash = await hashPassword('Password123!');
      const defaultUser: StoredUserRecord = {
        id: 'usr_default_test_01',
        email: 'test@example.com',
        fullName: 'Test User',
        passwordHash: defaultPasswordHash,
        createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
      };
      const initialUsers = [defaultUser];
      setGlobalUsersCache(initialUsers);
      await safeStorage.setItem(MOCK_USERS_DB_KEY, JSON.stringify(initialUsers));
      return initialUsers;
    }

    const parsed = JSON.parse(data) as StoredUserRecord[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const defaultPasswordHash = await hashPassword('Password123!');
      const defaultUser: StoredUserRecord = {
        id: 'usr_default_test_01',
        email: 'test@example.com',
        fullName: 'Test User',
        passwordHash: defaultPasswordHash,
        createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
      };
      const fallbackUsers = [defaultUser];
      setGlobalUsersCache(fallbackUsers);
      await safeStorage.setItem(MOCK_USERS_DB_KEY, JSON.stringify(fallbackUsers));
      return fallbackUsers;
    }

    setGlobalUsersCache(parsed);
    return parsed;
  } catch {
    const defaultPasswordHash = await hashPassword('Password123!');
    const defaultUser: StoredUserRecord = {
      id: 'usr_default_test_01',
      email: 'test@example.com',
      fullName: 'Test User',
      passwordHash: defaultPasswordHash,
      createdAt: new Date('2026-01-01T00:00:00.000Z').toISOString(),
    };
    const fallbackUsers = [defaultUser];
    setGlobalUsersCache(fallbackUsers);
    return fallbackUsers;
  }
}

/**
 * Save users list to safeStorage database `@mock_users_db`
 */
async function saveStoredUsers(users: StoredUserRecord[]): Promise<void> {
  setGlobalUsersCache(users);
  await safeStorage.setItem(MOCK_USERS_DB_KEY, JSON.stringify(users));
}

/**
 * Mock Sign Up Implementation
 */
export async function signUpMock(data: SignUpRequest): Promise<AuthResponse> {
  await delay(500);

  const normalizedEmail = data.email ? data.email.trim().toLowerCase() : '';
  const cleanPassword = data.password ? data.password.trim() : '';

  if (!normalizedEmail) {
    throw new Error('Vui lòng nhập địa chỉ email.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    throw new Error('Định dạng email không hợp lệ.');
  }

  if (!cleanPassword || cleanPassword.length < 6) {
    throw new Error('Mật khẩu phải chứa ít nhất 6 ký tự.');
  }

  if (data.confirmPassword !== undefined && data.confirmPassword.trim() !== cleanPassword) {
    throw new Error('Mật khẩu xác nhận không khớp.');
  }

  const users = await getStoredUsers();
  const existingUser = users.some((u) => u.email.toLowerCase() === normalizedEmail);

  if (existingUser) {
    throw new Error('Email này đã được sử dụng');
  }

  const passwordHash = await hashPassword(cleanPassword);
  const newUserId =
    'usr_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);

  const newUserRecord: StoredUserRecord = {
    id: newUserId,
    email: normalizedEmail,
    fullName: normalizedEmail.split('@')[0],
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUserRecord);
  await saveStoredUsers(users);

  console.log('[Mock SignUp] Saved:', {
    email: normalizedEmail,
    hash: passwordHash,
    totalUsers: users.length,
  });

  const accessToken = `mock_jwt_access_token_${newUserId}_${Date.now()}`;
  const refreshToken = `mock_jwt_refresh_token_${newUserId}_${Date.now()}`;

  const userDTO: UserDTO = {
    id: newUserRecord.id,
    email: newUserRecord.email,
    fullName: newUserRecord.fullName,
    createdAt: newUserRecord.createdAt,
  };

  // AUTO SIGN IN: Save active session directly to safeStorage
  await safeStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  await safeStorage.setItem(AUTH_USER_KEY, JSON.stringify(userDTO));

  return {
    accessToken,
    refreshToken,
    user: userDTO,
  };
}

/**
 * Mock Sign In Implementation
 */
export async function signInMock(data: SignInRequest): Promise<AuthResponse> {
  await delay(500);

  const normalizedEmail = data.email ? data.email.trim().toLowerCase() : '';
  const cleanPassword = data.password ? data.password.trim() : '';

  if (!normalizedEmail) {
    throw new Error('Vui lòng nhập email.');
  }

  if (!cleanPassword) {
    throw new Error('Vui lòng nhập mật khẩu.');
  }

  const users = await getStoredUsers();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  const inputHash = await hashPassword(cleanPassword);

  console.log('[Mock SignIn] Checking:', {
    inputEmail: normalizedEmail,
    found: !!user,
    match: user?.passwordHash === inputHash,
    dbCount: users.length,
  });

  if (!user || user.passwordHash !== inputHash) {
    throw new Error('Email hoặc mật khẩu không chính xác');
  }

  const accessToken = `mock_jwt_access_token_${user.id}_${Date.now()}`;
  const refreshToken = `mock_jwt_refresh_token_${user.id}_${Date.now()}`;

  const userDTO: UserDTO = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
  };

  await safeStorage.setItem(AUTH_TOKEN_KEY, accessToken);
  await safeStorage.setItem(AUTH_USER_KEY, JSON.stringify(userDTO));

  return {
    accessToken,
    refreshToken,
    user: userDTO,
  };
}

/**
 * Read session from `@auth_token` and `@auth_user`
 */
export async function getStoredSessionMock(): Promise<{
  token: string | null;
  user: UserDTO | null;
}> {
  try {
    const token = await safeStorage.getItem(AUTH_TOKEN_KEY);
    const userStr = await safeStorage.getItem(AUTH_USER_KEY);
    let user: UserDTO | null = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr) as UserDTO;
      } catch {
        user = null;
      }
    }
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

/**
 * Clear session tokens and user from `@auth_token` and `@auth_user`
 */
export async function signOutMock(): Promise<void> {
  await delay(300);
  await safeStorage.removeItem(AUTH_TOKEN_KEY);
  await safeStorage.removeItem(AUTH_USER_KEY);
}
