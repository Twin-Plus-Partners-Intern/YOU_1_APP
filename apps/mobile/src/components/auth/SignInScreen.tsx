// eslint-disable-next-line import/no-unresolved
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock } from 'lucide-react-native';
import { Svg, Path } from 'react-native-svg';

interface SignInScreenProps {
  onNavigateToSignUp?: () => void;
  onSignInSuccess?: () => void;
}

// Social Icons SVG (24x24 inside w-14 h-14 pill container)
const FacebookIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="#1877F2">
    <Path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </Svg>
);

const GoogleIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <Path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.23v3.14C3.21 21.32 7.33 24 12 24z"
    />
    <Path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.23C.44 8.16 0 9.97 0 12s.44 3.84 1.23 5.41l4.05-3.14z"
    />
    <Path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.21 2.68 1.23 6.59l4.05 3.14c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </Svg>
);

const AppleIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="#000000">
    <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.13-1.96.99-3.12-1 .04-2.18.67-2.88 1.49-.6.7-1.12 1.84-.98 2.97 1.12.09 2.22-.52 2.87-1.34z" />
  </Svg>
);

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onNavigateToSignUp,
  onSignInSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (onSignInSuccess) onSignInSuccess();
  };

  return (
    <View className="flex-1 bg-neutral-1000">
      {/* Ambient Top Glow */}
      <LinearGradient
        colors={['rgba(0, 238, 0, 0.15)', 'rgba(0, 238, 0, 0.03)', 'transparent']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 280 }}
      />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Main Content Centered Wrapper */}
            <View className="my-auto py-4">
              {/* 2. KHỐI HEADER */}
              <View className="items-center">
                <Text className="text-secondary-500 font-montserrat-bold text-3xl text-center">
                  Welcome back
                </Text>
                <Text className="text-primary-400 font-montserrat-medium text-base text-center mt-2">
                  Lets finish task together
                </Text>
              </View>

              {/* 3. KHỐI FORM & INPUTS (gutter gap-5 = 20px, mt-10 = 40px) */}
              <View className="gap-5 mt-10">
                {/* Email Input */}
                <View className="flex-row items-center bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-4">
                  <Mail size={20} color="#94A3B8" className="mr-3" />
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor="#64748B"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 text-primary-500 font-montserrat text-base p-0"
                  />
                </View>

                {/* Password Input */}
                <View className="flex-row items-center bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-4">
                  <Lock size={20} color="#94A3B8" className="mr-3" />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="#64748B"
                    secureTextEntry
                    className="flex-1 text-primary-500 font-montserrat text-base p-0"
                  />
                </View>
              </View>

              {/* 4. NÚT ACTION CHÍNH (mt-6 = 24px) */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSignIn}
                className="bg-primary-500 rounded-full py-4 items-center justify-center mt-6 shadow-sm"
              >
                <Text className="text-neutral-1000 font-montserrat-bold text-base">
                  Create account
                </Text>
              </TouchableOpacity>

              {/* 5. CỤM DIVIDER "or" (mt-8 = 32px) */}
              <View className="flex-row items-center justify-center mt-8">
                <View className="flex-1 h-[1px] bg-neutral-700" />
                <Text className="text-primary-400 font-montserrat-medium text-sm px-4">or</Text>
                <View className="flex-1 h-[1px] bg-neutral-700" />
              </View>

              {/* Dòng chữ "Sign in with" (mt-6 = 24px) */}
              <Text className="text-primary-400 font-montserrat-medium text-sm text-center mt-6">
                Sign in with
              </Text>

              {/* Hàng 3 nút mạng xã hội (mt-4 = 16px, gap-5 = 20px, w-14 h-14) */}
              <View className="flex-row justify-center items-center gap-5 mt-4">
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="w-14 h-14 rounded-full bg-white items-center justify-center shadow-md"
                >
                  <FacebookIcon />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="w-14 h-14 rounded-full bg-white items-center justify-center shadow-md"
                >
                  <GoogleIcon />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  className="w-14 h-14 rounded-full bg-white items-center justify-center shadow-md"
                >
                  <AppleIcon />
                </TouchableOpacity>
              </View>
            </View>

            {/* FOOTER (Đáy màn hình) */}
            <View className="pb-6 flex-row justify-center items-center">
              <Text className="text-primary-400 font-montserrat-medium text-sm">
                Already have an account?{' '}
              </Text>
              <TouchableOpacity onPress={onNavigateToSignUp}>
                <Text className="text-info-400 font-montserrat-semibold text-sm">Log in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default SignInScreen;
