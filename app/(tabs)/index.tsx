import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@src/hooks/useAuth';

export default function HomeScreen() {
  const { user } = useAuth();

  // TODO: 실제 데이터로 교체
  const mockData = {
    totalExpense: 1247000,
    monthlyIncome: 2000000,
    upcomingPayments: [
      { id: '1', name: '넷플릭스', amount: 17000, daysLeft: 3, date: '12/25', icon: '🎬' },
      { id: '2', name: '통신비', amount: 65000, daysLeft: 5, date: '12/27', icon: '📱' },
      { id: '3', name: '헬스장', amount: 99000, daysLeft: 7, date: '12/29', icon: '💪' },
    ],
    categoryBreakdown: [
      { name: '주거', amount: 550000, icon: '🏠', color: 'bg-[#FF6B6B]' },
      { name: '구독', amount: 89000, icon: '🎬', color: 'bg-[#45B7D1]' },
      { name: '통신', amount: 98000, icon: '📱', color: 'bg-primary' },
      { name: '보험', amount: 150000, icon: '🛡️', color: 'bg-[#96CEB4]' },
    ],
  };

  const ratio = Math.round((mockData.totalExpense / mockData.monthlyIncome) * 100);

  return (
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-5 pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 */}
        <View className="mb-5">
          <Text className="text-2xl font-bold text-gray-800">안녕하세요! 👋</Text>
          <Text className="text-sm text-gray-500 mt-1">12월 고정지출</Text>
        </View>

        {/* 총액 카드 */}
        <View className="bg-primary rounded-2xl p-6 mb-6">
          <Text className="text-sm text-white/80">이번 달 고정지출</Text>
          <Text className="text-4xl font-bold text-white mt-2">
            ₩{mockData.totalExpense.toLocaleString()}
          </Text>
          <View className="mt-4">
            <View className="h-2 bg-white/30 rounded-full">
              <View
                className="h-full bg-white rounded-full"
                style={{ width: `${Math.min(ratio, 100)}%` }}
              />
            </View>
            <Text className="text-xs text-white/80 mt-2">월급 대비 {ratio}%</Text>
          </View>
        </View>

        {/* 다가오는 결제 */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">📅 다가오는 결제</Text>
          <View className="bg-white rounded-2xl overflow-hidden">
            {mockData.upcomingPayments.map((payment, index) => (
              <View
                key={payment.id}
                className={`flex-row justify-between items-center p-4 ${
                  index < mockData.upcomingPayments.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">{payment.icon}</Text>
                  <View>
                    <Text className="text-base font-medium text-gray-800">{payment.name}</Text>
                    <Text className="text-xs text-gray-400 mt-0.5">{payment.date}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-base font-semibold text-gray-800">
                    ₩{payment.amount.toLocaleString()}
                  </Text>
                  <Text className="text-xs font-semibold text-danger mt-0.5">
                    D-{payment.daysLeft}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* 카테고리별 */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">📊 카테고리별</Text>
          <View className="bg-white rounded-2xl p-4 gap-3">
            {mockData.categoryBreakdown.map((category, index) => (
              <View key={index} className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2 w-20">
                  <Text className="text-xl">{category.icon}</Text>
                  <Text className="text-sm text-gray-500">{category.name}</Text>
                </View>
                <View className="flex-1 flex-row items-center gap-2 ml-4">
                  <View
                    className={`h-5 rounded ${category.color}`}
                    style={{ width: `${(category.amount / mockData.totalExpense) * 100}%` }}
                  />
                  <Text className="text-sm font-medium text-gray-800 w-16 text-right">
                    ₩{(category.amount / 1000).toFixed(0)}K
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
