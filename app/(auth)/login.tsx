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
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@src/lib/supabase';
import { GlassCard } from '@src/components/GlassCard';

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
    <View className="flex-1 bg-dark">
      <LinearGradient
        colors={['#0A1A1F', '#0D2530', '#143D4D']}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1 justify-center px-6"
        >
          {/* 로고 */}
          <View className="items-center mb-12">
            <Text className="text-5xl font-bold text-neon-mint">Fluxy</Text>
            <Text className="text-white/60 text-base mt-2">흐르는 돈, 한눈에</Text>
          </View>

          {/* 로그인 폼 */}
          <GlassCard className="p-6">
            <View className="gap-4">
              <View>
                <Text className="text-white/60 text-sm mb-2">이메일</Text>
                <TextInput
                  className="bg-white/5 border border-white/20 rounded-xl p-4 text-white"
                  placeholder="email@example.com"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View>
                <Text className="text-white/60 text-sm mb-2">비밀번호</Text>
                <TextInput
                  className="bg-white/5 border border-white/20 rounded-xl p-4 text-white"
                  placeholder="••••••••"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                className={`mt-2 rounded-xl overflow-hidden ${loading ? 'opacity-60' : ''}`}
                onPress={handleAuth}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#00F5D4', '#00D4FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="p-4 items-center"
                >
                  <Text className="text-dark font-bold text-lg">
                    {loading ? '처리 중...' : isLogin ? '로그인' : '회원가입'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </GlassCard>

          <TouchableOpacity
            className="items-center mt-6"
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text className="text-white/60">
              {isLogin ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
              <Text className="text-neon-mint font-semibold">
                {isLogin ? '회원가입' : '로그인'}
              </Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
