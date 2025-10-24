// lib/auth/auth-config.ts
export const AUTH_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3212',
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  USER_KEY: 'user_data',
  // biome-ignore lint/style/noMagicNumbers: <time>
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes
} as const;

export const API_ENDPOINTS = {
  LOGIN: '/api/v1/auth/signin',
  REGISTER: '/api/v1/auth/signup',
  LOGOUT: '/api/v1/auth/logout',
} as const;
