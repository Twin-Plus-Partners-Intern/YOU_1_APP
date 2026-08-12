import axios from 'axios';
import { Platform } from 'react-native';

const getBaseURL = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  // Safe fallback URL: http://10.0.2.2:5000 for Android Emulator, http://localhost:5000 for others
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000';
  }
  return 'http://localhost:5000';
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000, // 8-second timeout to prevent hanging requests
});

// Response Interceptor for graceful error handling and crash protection
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('[API Client Error]:', error.message || error);
    // Graceful error mapping to prevent unhandled promise rejections
    return Promise.resolve({
      data: {
        success: false,
        error: error.response?.data?.error || error.message || 'Network request failed',
      },
    });
  }
);
