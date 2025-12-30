import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '@src/hooks/useAuth';
import { GlassCard } from '@src/components/GlassCard';

interface SettingItem {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  onPress: () => void;
  isDanger?: boolean;
}

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: signOut },
    ]);
  };

  const settingSections: { title: string; items: SettingItem[] }[] = [
    {
      title: '일반',
      items: [
        { icon: 'bell', label: '알림 설정', onPress: () => {} },
        { icon: 'tags', label: '카테고리 관리', onPress: () => {} },
        { icon: 'won', label: '월급 설정', onPress: () => {} },
      ],
    },
    {
      title: '계정',
      items: [
        { icon: 'user', label: '내 정보', onPress: () => {} },
        { icon: 'lock', label: '보안', onPress: () => {} },
      ],
    },
    {
      title: '기타',
      items: [
        { icon: 'question-circle', label: '도움말', onPress: () => {} },
        { icon: 'info-circle', label: '앱 정보', onPress: () => {} },
        { icon: 'sign-out', label: '로그아웃', onPress: handleSignOut, isDanger: true },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-dark">
      <LinearGradient
        colors={['#0A1A1F', '#0D2530', '#143D4D']}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-5 py-4">
            <Text className="text-white text-2xl font-bold">설정</Text>
          </View>

          {/* 프로필 카드 */}
          <GlassCard className="mx-5 p-5 flex-row items-center mb-6">
            <View className="w-16 h-16 rounded-full overflow-hidden">
              <LinearGradient
                colors={['#00F5D4', '#00D4FF']}
                className="w-full h-full justify-center items-center"
              >
                <FontAwesome name="user" size={28} color="#0A1A1F" />
              </LinearGradient>
            </View>
            <View className="ml-4">
              <Text className="text-white text-lg font-semibold">
                {user?.email?.split('@')[0] || '사용자'}
              </Text>
              <Text className="text-white/40 text-sm mt-1">
                {user?.email || 'email@example.com'}
              </Text>
            </View>
          </GlassCard>

          {/* 설정 목록 */}
          {settingSections.map((section) => (
            <View key={section.title} className="mb-6 px-5">
              <Text className="text-white/40 text-sm font-semibold mb-2 ml-1">
                {section.title}
              </Text>
              <GlassCard className="overflow-hidden">
                {section.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.label}
                    className={`flex-row justify-between items-center p-4 ${
                      index < section.items.length - 1 ? 'border-b border-white/10' : ''
                    }`}
                    onPress={item.onPress}
                  >
                    <View className="flex-row items-center gap-3">
                      <FontAwesome
                        name={item.icon}
                        size={18}
                        color={item.isDanger ? '#FF6B6B' : 'rgba(255,255,255,0.6)'}
                      />
                      <Text
                        className={`text-base ${item.isDanger ? 'text-danger' : 'text-white'}`}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <FontAwesome name="chevron-right" size={12} color="rgba(255,255,255,0.3)" />
                  </TouchableOpacity>
                ))}
              </GlassCard>
            </View>
          ))}

          <Text className="text-center text-white/30 text-xs mb-5">Fluxy v1.0.0</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
