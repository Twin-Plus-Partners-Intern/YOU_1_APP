export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface UserDTO {
  id: string;
  email: string;
  fullName?: string;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}

export interface StoredUserRecord {
  id: string;
  email: string;
  fullName?: string;
  passwordHash: string;
  createdAt: string;
}
