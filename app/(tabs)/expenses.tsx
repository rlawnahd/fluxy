import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { GlassCard } from '@src/components/GlassCard';

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: { name: string; icon: string };
  billing_date: number;
}

export default function ExpensesScreen() {
  const mockExpenses: Expense[] = [
    { id: '1', name: '넷플릭스', amount: 17000, category: { name: '구독', icon: '🎬' }, billing_date: 25 },
    { id: '2', name: '유튜브 프리미엄', amount: 14900, category: { name: '구독', icon: '🎬' }, billing_date: 15 },
    { id: '3', name: '통신비', amount: 65000, category: { name: '통신', icon: '📱' }, billing_date: 27 },
    { id: '4', name: '월세', amount: 550000, category: { name: '주거', icon: '🏠' }, billing_date: 25 },
    { id: '5', name: '헬스장', amount: 99000, category: { name: '건강', icon: '💪' }, billing_date: 1 },
    { id: '6', name: '자동차 보험', amount: 150000, category: { name: '보험', icon: '🛡️' }, billing_date: 10 },
  ];

  const totalAmount = mockExpenses.reduce((sum, e) => sum + e.amount, 0);

  const renderExpenseItem = ({ item }: { item: Expense }) => (
    <TouchableOpacity onPress={() => router.push(`/expense/${item.id}`)}>
      <GlassCard className="flex-row justify-between items-center p-4 mb-3">
        <View className="flex-row items-center gap-3">
          <View className="w-12 h-12 rounded-xl bg-white/10 justify-center items-center">
            <Text className="text-2xl">{item.category.icon}</Text>
          </View>
          <View>
            <Text className="text-white font-semibold">{item.name}</Text>
            <Text className="text-white/40 text-xs mt-0.5">
              {item.category.name} · 매월 {item.billing_date}일
            </Text>
          </View>
        </View>
        <Text className="text-white font-semibold">₩{item.amount.toLocaleString()}</Text>
      </GlassCard>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-dark">
      <LinearGradient
        colors={['#0A1A1F', '#0D2530', '#143D4D']}
        className="absolute inset-0"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <SafeAreaView className="flex-1" edges={['top']}>
        {/* 헤더 */}
        <View className="flex-row justify-between items-center px-5 py-4">
          <View>
            <Text className="text-white text-2xl font-bold">고정지출</Text>
            <Text className="text-white/40 text-sm mt-1">
              {mockExpenses.length}개 · ₩{totalAmount.toLocaleString()}/월
            </Text>
          </View>
          <TouchableOpacity
            className="w-12 h-12 rounded-full overflow-hidden"
            onPress={() => router.push('/expense/add')}
          >
            <LinearGradient
              colors={['#00F5D4', '#00D4FF']}
              className="w-full h-full justify-center items-center"
            >
              <FontAwesome name="plus" size={20} color="#0A1A1F" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockExpenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-5 pb-5"
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}
