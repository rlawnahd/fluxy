import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '@src/components/GlassCard';

export default function CalendarScreen() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const paymentDays: { [key: number]: { name: string; amount: number; icon: string }[] } = {
    1: [{ name: '헬스장', amount: 99000, icon: '💪' }],
    10: [{ name: '자동차 보험', amount: 150000, icon: '🛡️' }],
    15: [{ name: '유튜브 프리미엄', amount: 14900, icon: '🎬' }],
    25: [
      { name: '넷플릭스', amount: 17000, icon: '🎬' },
      { name: '월세', amount: 550000, icon: '🏠' },
    ],
    27: [{ name: '통신비', amount: 65000, icon: '📱' }],
  };

  const renderCalendar = () => {
    const days = [];
    const totalSlots = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalSlots; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
      const isToday = isValidDay && dayNumber === currentDate.getDate();
      const hasPayment = isValidDay && paymentDays[dayNumber];

      days.push(
        <View key={i} className="w-[14.28%] aspect-square justify-center items-center">
          {isValidDay && (
            <>
              <View
                className={`w-9 h-9 rounded-full justify-center items-center ${
                  isToday ? 'overflow-hidden' : ''
                }`}
              >
                {isToday ? (
                  <LinearGradient
                    colors={['#00F5D4', '#00D4FF']}
                    className="w-full h-full justify-center items-center"
                  >
                    <Text className="text-dark font-bold">{dayNumber}</Text>
                  </LinearGradient>
                ) : (
                  <Text className="text-white/80">{dayNumber}</Text>
                )}
              </View>
              {hasPayment && (
                <View className="w-1.5 h-1.5 rounded-full bg-neon-yellow mt-0.5" />
              )}
            </>
          )}
        </View>
      );
    }

    return days;
  };

  const upcomingPayments = Object.entries(paymentDays)
    .filter(([day]) => parseInt(day) >= currentDate.getDate())
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .slice(0, 5);

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
            <Text className="text-white text-2xl font-bold">
              {year}년 {monthNames[month]}
            </Text>
          </View>

          {/* 캘린더 */}
          <GlassCard className="mx-5 p-4">
            <View className="flex-row mb-3">
              {dayNames.map((day, index) => (
                <Text
                  key={day}
                  className={`flex-1 text-center text-sm font-medium ${
                    index === 0 ? 'text-red-400' : index === 6 ? 'text-blue-400' : 'text-white/40'
                  }`}
                >
                  {day}
                </Text>
              ))}
            </View>
            <View className="flex-row flex-wrap">{renderCalendar()}</View>
          </GlassCard>

          {/* 다가오는 결제 */}
          <View className="p-5">
            <Text className="text-white text-lg font-semibold mb-3">이번 달 남은 결제</Text>
            <GlassCard className="overflow-hidden">
              {upcomingPayments.map(([day, payments]) => (
                <View key={day}>
                  {payments.map((payment, index) => (
                    <View
                      key={index}
                      className="flex-row justify-between items-center p-4 border-b border-white/10"
                    >
                      <View className="flex-row items-center gap-3">
                        <View className="w-10 h-10 rounded-xl bg-white/10 justify-center items-center">
                          <Text className="text-xl">{payment.icon}</Text>
                        </View>
                        <View>
                          <Text className="text-white font-medium">{payment.name}</Text>
                          <Text className="text-white/40 text-xs mt-0.5">
                            {month + 1}/{day}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-white font-semibold">
                        ₩{payment.amount.toLocaleString()}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </GlassCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
