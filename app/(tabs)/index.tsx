import { FluxSphere } from '@src/components/FluxSphere';
import { GlassCard } from '@src/components/GlassCard';
import { useAuth } from '@src/hooks/useAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const { user } = useAuth();

    // TODO: 실제 데이터로 교체
    const mockData = {
        totalExpense: 1000000,
        monthlyIncome: 2000000,
        upcomingPayments: [
            { id: '1', name: '넷플릭스', amount: 17000, daysLeft: 3, date: '12/25', icon: '🎬' },
            { id: '2', name: '통신비', amount: 65000, daysLeft: 5, date: '12/27', icon: '📱' },
            { id: '3', name: '헬스장', amount: 99000, daysLeft: 7, date: '12/29', icon: '💪' },
        ],
        categoryBreakdown: [
            { name: '주거', amount: 550000, icon: '🏠', percent: 44 },
            { name: '구독', amount: 89000, icon: '🎬', percent: 7 },
            { name: '통신', amount: 98000, icon: '📱', percent: 8 },
            { name: '보험', amount: 150000, icon: '🛡️', percent: 12 },
        ],
    };

    const ratio = Math.round((mockData.totalExpense / mockData.monthlyIncome) * 100);

    return (
        <View className="flex-1 bg-dark">
            {/* 배경 그라데이션 */}
            <LinearGradient
                colors={['#0A1A1F', '#0D2530', '#143D4D']}
                className="absolute inset-0"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            <SafeAreaView className="flex-1" edges={['top']}>
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="p-5 pb-10"
                    showsVerticalScrollIndicator={false}
                >
                    {/* 헤더 */}
                    <View className="mb-4">
                        <Text className="text-white/60 text-sm">안녕하세요 👋</Text>
                        <Text className="text-white text-2xl font-bold mt-1">12월 고정지출</Text>
                    </View>

                    {/* 플럭스 스피어 */}
                    <View className="items-center mb-8">
                        <FluxSphere percentage={ratio} amount={mockData.totalExpense} salary={mockData.monthlyIncome} />
                    </View>

                    {/* 다가오는 결제 */}
                    <View className="mb-6">
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-white text-lg font-semibold">다가오는 결제</Text>
                            <Text className="text-white/40 text-sm">7일 내</Text>
                        </View>

                        <GlassCard className="overflow-hidden">
                            {mockData.upcomingPayments.map((payment, index) => (
                                <View
                                    key={payment.id}
                                    className={`flex-row justify-between items-center p-4 ${
                                        index < mockData.upcomingPayments.length - 1 ? 'border-b border-white/10' : ''
                                    }`}
                                >
                                    <View className="flex-row items-center gap-3">
                                        <View className="w-10 h-10 rounded-xl bg-white/10 justify-center items-center">
                                            <Text className="text-xl">{payment.icon}</Text>
                                        </View>
                                        <View>
                                            <Text className="text-white font-medium">{payment.name}</Text>
                                            <Text className="text-white/40 text-xs mt-0.5">{payment.date}</Text>
                                        </View>
                                    </View>
                                    <View className="items-end">
                                        <Text className="text-white font-semibold">
                                            ₩{payment.amount.toLocaleString()}
                                        </Text>
                                        <View className="bg-neon-yellow/20 px-2 py-0.5 rounded mt-1">
                                            <Text className="text-neon-yellow text-xs font-semibold">
                                                D-{payment.daysLeft}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </GlassCard>
                    </View>

                    {/* 카테고리별 지출 */}
                    <View className="mb-6">
                        <Text className="text-white text-lg font-semibold mb-3">카테고리별</Text>

                        <GlassCard className="p-4">
                            {mockData.categoryBreakdown.map((category, index) => (
                                <View
                                    key={index}
                                    className={`flex-row items-center ${
                                        index < mockData.categoryBreakdown.length - 1 ? 'mb-4' : ''
                                    }`}
                                >
                                    <View className="w-10 h-10 rounded-xl bg-white/10 justify-center items-center">
                                        <Text className="text-xl">{category.icon}</Text>
                                    </View>
                                    <View className="flex-1 ml-3">
                                        <View className="flex-row justify-between mb-1">
                                            <Text className="text-white/80 text-sm">{category.name}</Text>
                                            <Text className="text-white text-sm font-medium">
                                                ₩{(category.amount / 1000).toFixed(0)}K
                                            </Text>
                                        </View>
                                        <View className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <LinearGradient
                                                colors={['#00F5D4', '#00D4FF']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                className="h-full rounded-full"
                                                style={{ width: `${category.percent}%` }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </GlassCard>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
