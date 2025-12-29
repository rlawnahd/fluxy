import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarScreen() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  // TODO: 실제 결제일 데이터로 교체
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
                className={`w-8 h-8 rounded-full justify-center items-center ${
                  isToday ? 'bg-primary' : ''
                }`}
              >
                <Text className={`text-sm ${isToday ? 'text-white font-semibold' : 'text-gray-800'}`}>
                  {dayNumber}
                </Text>
              </View>
              {hasPayment && <View className="w-1.5 h-1.5 rounded-full bg-danger mt-0.5" />}
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
    <SafeAreaView className="flex-1 bg-gray-100" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4">
          <Text className="text-3xl font-bold text-gray-800">
            {year}년 {monthNames[month]}
          </Text>
        </View>

        {/* 캘린더 */}
        <View className="bg-white mx-5 rounded-2xl p-4">
          <View className="flex-row mb-2">
            {dayNames.map((day, index) => (
              <Text
                key={day}
                className={`flex-1 text-center text-sm font-medium ${
                  index === 0 ? 'text-danger' : index === 6 ? 'text-secondary' : 'text-gray-500'
                }`}
              >
                {day}
              </Text>
            ))}
          </View>
          <View className="flex-row flex-wrap">{renderCalendar()}</View>
        </View>

        {/* 다가오는 결제 */}
        <View className="p-5">
          <Text className="text-lg font-semibold text-gray-800 mb-3">이번 달 남은 결제</Text>
          <View className="bg-white rounded-2xl overflow-hidden">
            {upcomingPayments.map(([day, payments]) => (
              <View key={day}>
                {payments.map((payment, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between items-center p-4 border-b border-gray-100"
                  >
                    <View className="flex-row items-center gap-3">
                      <Text className="text-2xl">{payment.icon}</Text>
                      <View>
                        <Text className="text-base font-medium text-gray-800">{payment.name}</Text>
                        <Text className="text-xs text-gray-400 mt-0.5">
                          {month + 1}/{day}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-base font-semibold text-gray-800">
                      ₩{payment.amount.toLocaleString()}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
