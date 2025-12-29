import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: { name: string; icon: string; color: string };
  billing_date: number;
  is_active: boolean;
}

export default function ExpensesScreen() {
  // TODO: 실제 데이터로 교체
  const mockExpenses: Expense[] = [
    { id: '1', name: '넷플릭스', amount: 17000, category: { name: '구독', icon: '🎬', color: '#45B7D1' }, billing_date: 25, is_active: true },
    { id: '2', name: '유튜브 프리미엄', amount: 14900, category: { name: '구독', icon: '🎬', color: '#45B7D1' }, billing_date: 15, is_active: true },
    { id: '3', name: '통신비', amount: 65000, category: { name: '통신', icon: '📱', color: '#4ECDC4' }, billing_date: 27, is_active: true },
    { id: '4', name: '월세', amount: 550000, category: { name: '주거', icon: '🏠', color: '#FF6B6B' }, billing_date: 25, is_active: true },
    { id: '5', name: '헬스장', amount: 99000, category: { name: '건강', icon: '💪', color: '#98D8C8' }, billing_date: 1, is_active: true },
    { id: '6', name: '자동차 보험', amount: 150000, category: { name: '보험', icon: '🛡️', color: '#96CEB4' }, billing_date: 10, is_active: true },
  ];

  const totalAmount = mockExpenses.reduce((sum, e) => sum + e.amount, 0);

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center bg-white p-4 rounded-2xl"
      onPress={() => router.push(`/expense/${item.id}`)}
    >
      <View className="flex-row items-center gap-3">
        <View
          className="w-12 h-12 rounded-xl justify-center items-center"
          style={{ backgroundColor: item.category.color + '20' }}
        >
          <Text className="text-2xl">{item.category.icon}</Text>
        </View>
        <View>
          <Text className="text-base font-semibold text-gray-800">{item.name}</Text>
          <Text className="text-xs text-gray-400 mt-0.5">
            {item.category.name} · 매월 {item.billing_date}일
          </Text>
        </View>
      </View>
      <Text className="text-base font-semibold text-gray-800">
        ₩{item.amount.toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      <View className="flex-row justify-between items-center px-5 py-4">
        <View>
          <Text className="text-3xl font-bold text-gray-800">고정지출</Text>
          <Text className="text-sm text-gray-500 mt-1">
            총 {mockExpenses.length}개 · ₩{totalAmount.toLocaleString()}/월
          </Text>
        </View>
        <TouchableOpacity
          className="w-12 h-12 rounded-full bg-primary justify-center items-center"
          onPress={() => router.push('/expense/add')}
        >
          <FontAwesome name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockExpenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-5 gap-3 pb-5"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
