import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@src/lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요');
      return;
    }

    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Alert.alert('로그인 실패', error.message);
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        Alert.alert('회원가입 실패', error.message);
      } else {
        Alert.alert('성공', '이메일을 확인해주세요');
      }
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-center px-6"
      >
        <View className="items-center mb-12">
          <Text className="text-5xl font-bold text-primary">Fluxy</Text>
          <Text className="text-base text-gray-500 mt-2">흐르는 돈, 한눈에</Text>
        </View>

        <View className="gap-4">
          <TextInput
            className="border border-gray-200 rounded-xl p-4 text-base bg-gray-50"
            placeholder="이메일"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="border border-gray-200 rounded-xl p-4 text-base bg-gray-50"
            placeholder="비밀번호"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            className={`bg-primary rounded-xl p-4 items-center mt-2 ${loading ? 'opacity-60' : ''}`}
            onPress={handleAuth}
            disabled={loading}
          >
            <Text className="text-white text-lg font-semibold">
              {loading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center mt-4"
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text className="text-primary text-sm">
              {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
