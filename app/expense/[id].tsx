import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlassCard } from '@src/components/GlassCard';

export default function ExpenseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // TODO: 실제 데이터로 교체
  const expense = {
    id,
    name: '넷플릭스',
    amount: 17000,
    category: { name: '구독', icon: '🎬' },
    billing_date: 25,
    payment_method: '신한카드',
    memo: '프리미엄 요금제',
    start_date: '2024-01-01',
  };

  const handleDelete = () => {
    Alert.alert('삭제', '이 지출을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          router.back();
        },
      },
    ]);
  };

  return (
    <View className="flex-1 bg-dark">
      <LinearGradient
        colors={['#0A1A1F', '#0D2530', '#143D4D']}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1" edges={['bottom']}>
        <View className="flex-1 p-5 items-center">
          {/* 카테고리 아이콘 */}
          <View className="w-20 h-20 rounded-full overflow-hidden mb-4">
            <LinearGradient
              colors={['#00F5D4', '#00D4FF']}
              className="w-full h-full justify-center items-center"
            >
              <Text className="text-4xl">{expense.category.icon}</Text>
            </LinearGradient>
          </View>

          {/* 이름과 금액 */}
          <Text className="text-white text-2xl font-bold">{expense.name}</Text>
          <Text className="text-neon-mint text-4xl font-bold mt-2">
            ₩{expense.amount.toLocaleString()}
          </Text>
          <Text className="text-white/40 text-sm mt-1">매월</Text>

          {/* 상세 정보 */}
          <GlassCard className="w-full p-5 mt-8">
            <View className="gap-4">
              <View className="flex-row justify-between">
                <Text className="text-white/40">카테고리</Text>
                <Text className="text-white font-medium">{expense.category.name}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-white/40">결제일</Text>
                <Text className="text-white font-medium">매월 {expense.billing_date}일</Text>
              </View>
              {expense.payment_method && (
                <View className="flex-row justify-between">
                  <Text className="text-white/40">결제 수단</Text>
                  <Text className="text-white font-medium">{expense.payment_method}</Text>
                </View>
              )}
              <View className="flex-row justify-between">
                <Text className="text-white/40">시작일</Text>
                <Text className="text-white font-medium">{expense.start_date}</Text>
              </View>
              {expense.memo && (
                <View className="flex-row justify-between">
                  <Text className="text-white/40">메모</Text>
                  <Text className="text-white font-medium">{expense.memo}</Text>
                </View>
              )}
            </View>
          </GlassCard>
        </View>

        {/* 버튼 영역 */}
        <View className="flex-row p-5 gap-3">
          <TouchableOpacity
            className="flex-1 rounded-xl overflow-hidden"
            onPress={() => {}}
          >
            <GlassCard className="flex-row justify-center items-center gap-2 p-4">
              <FontAwesome name="pencil" size={16} color="#00F5D4" />
              <Text className="text-neon-mint font-semibold">수정</Text>
            </GlassCard>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 rounded-xl overflow-hidden"
            onPress={handleDelete}
          >
            <GlassCard className="flex-row justify-center items-center gap-2 p-4 border-danger">
              <FontAwesome name="trash" size={16} color="#FF6B6B" />
              <Text className="text-danger font-semibold">삭제</Text>
            </GlassCard>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
