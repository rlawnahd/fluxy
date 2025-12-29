import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '@src/hooks/useAuth';

interface SettingItem {
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  label: string;
  onPress: () => void;
  color?: string;
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
        { icon: 'sign-out', label: '로그아웃', onPress: handleSignOut, color: '#FF6B6B' },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4">
          <Text className="text-3xl font-bold text-gray-800">설정</Text>
        </View>

        {/* 프로필 카드 */}
        <View className="flex-row items-center bg-white mx-5 p-5 rounded-2xl mb-6">
          <View className="w-16 h-16 rounded-full bg-primary/20 justify-center items-center">
            <FontAwesome name="user" size={32} color="#4ECDC4" />
          </View>
          <View className="ml-4">
            <Text className="text-lg font-semibold text-gray-800">
              {user?.email?.split('@')[0] || '사용자'}
            </Text>
            <Text className="text-sm text-gray-400 mt-1">
              {user?.email || 'email@example.com'}
            </Text>
          </View>
        </View>

        {/* 설정 목록 */}
        {settingSections.map((section) => (
          <View key={section.title} className="mb-6 px-5">
            <Text className="text-sm font-semibold text-gray-400 mb-2 ml-1">
              {section.title}
            </Text>
            <View className="bg-white rounded-2xl overflow-hidden">
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  className={`flex-row justify-between items-center p-4 ${
                    index < section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                  onPress={item.onPress}
                >
                  <View className="flex-row items-center gap-3">
                    <FontAwesome
                      name={item.icon}
                      size={20}
                      color={item.color || '#666'}
                    />
                    <Text
                      className="text-base"
                      style={{ color: item.color || '#333' }}
                    >
                      {item.label}
                    </Text>
                  </View>
                  <FontAwesome name="chevron-right" size={14} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <Text className="text-center text-gray-400 text-xs mb-5">Fluxy v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
