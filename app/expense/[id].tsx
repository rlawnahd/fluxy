import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ExpenseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // TODO: 실제 데이터로 교체
  const expense = {
    id,
    name: '넷플릭스',
    amount: 17000,
    category: { name: '구독', icon: '🎬', color: '#45B7D1' },
    billing_date: 25,
    payment_method: '신한카드',
    memo: '프리미엄 요금제',
    is_active: true,
    start_date: '2024-01-01',
  };

  const handleDelete = () => {
    Alert.alert('삭제', '이 지출을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          // TODO: Supabase에서 삭제
          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['bottom']}>
      <View className="flex-1 p-5 items-center">
        {/* 카테고리 아이콘 */}
        <View
          className="w-20 h-20 rounded-full justify-center items-center mb-4"
          style={{ backgroundColor: expense.category.color + '20' }}
        >
          <Text className="text-4xl">{expense.category.icon}</Text>
        </View>

        {/* 이름과 금액 */}
        <Text className="text-2xl font-bold text-gray-800">{expense.name}</Text>
        <Text className="text-4xl font-bold text-primary mt-2">
          ₩{expense.amount.toLocaleString()}
        </Text>
        <Text className="text-sm text-gray-400 mt-1">매월</Text>

        {/* 상세 정보 */}
        <View className="w-full bg-white rounded-2xl p-5 mt-8 gap-4">
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-400">카테고리</Text>
            <Text className="text-sm font-medium text-gray-800">{expense.category.name}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-400">결제일</Text>
            <Text className="text-sm font-medium text-gray-800">매월 {expense.billing_date}일</Text>
          </View>
          {expense.payment_method && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-400">결제 수단</Text>
              <Text className="text-sm font-medium text-gray-800">{expense.payment_method}</Text>
            </View>
          )}
          <View className="flex-row justify-between">
            <Text className="text-sm text-gray-400">시작일</Text>
            <Text className="text-sm font-medium text-gray-800">{expense.start_date}</Text>
          </View>
          {expense.memo && (
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-400">메모</Text>
              <Text className="text-sm font-medium text-gray-800">{expense.memo}</Text>
            </View>
          )}
        </View>
      </View>

      {/* 버튼 영역 */}
      <View className="flex-row p-5 gap-3">
        <TouchableOpacity
          className="flex-1 flex-row justify-center items-center gap-2 bg-white border border-primary rounded-xl p-4"
          onPress={() => {}}
        >
          <FontAwesome name="pencil" size={18} color="#4ECDC4" />
          <Text className="text-base font-semibold text-primary">수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 flex-row justify-center items-center gap-2 bg-white border border-danger rounded-xl p-4"
          onPress={handleDelete}
        >
          <FontAwesome name="trash" size={18} color="#FF6B6B" />
          <Text className="text-base font-semibold text-danger">삭제</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
