import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { GlassCard } from '@src/components/GlassCard';

const categories = [
  { id: '1', name: '주거', icon: '🏠' },
  { id: '2', name: '통신', icon: '📱' },
  { id: '3', name: '구독', icon: '🎬' },
  { id: '4', name: '보험', icon: '🛡️' },
  { id: '5', name: '교통', icon: '🚗' },
  { id: '6', name: '교육', icon: '📚' },
  { id: '7', name: '건강', icon: '💪' },
  { id: '8', name: '기타', icon: '📦' },
];

export default function AddExpenseScreen() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [billingDate, setBillingDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [memo, setMemo] = useState('');

  const handleSave = async () => {
    if (!name || !amount || !selectedCategory || !billingDate) {
      Alert.alert('오류', '필수 항목을 모두 입력해주세요');
      return;
    }

    const billingDateNum = parseInt(billingDate);
    if (isNaN(billingDateNum) || billingDateNum < 1 || billingDateNum > 31) {
      Alert.alert('오류', '결제일은 1~31 사이의 숫자여야 합니다');
      return;
    }

    // TODO: Supabase에 저장
    Alert.alert('성공', '지출이 추가되었습니다', [
      { text: '확인', onPress: () => router.back() },
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

      <ScrollView
        className="flex-1"
        contentContainerClassName="p-5"
        showsVerticalScrollIndicator={false}
      >
        {/* 이름 */}
        <View className="mb-5">
          <Text className="text-white/60 text-sm mb-2">이름 *</Text>
          <TextInput
            className="bg-white/5 border border-white/20 rounded-xl p-4 text-white"
            placeholder="예: 넷플릭스"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* 금액 */}
        <View className="mb-5">
          <Text className="text-white/60 text-sm mb-2">금액 *</Text>
          <TextInput
            className="bg-white/5 border border-white/20 rounded-xl p-4 text-white"
            placeholder="예: 17000"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* 카테고리 */}
        <View className="mb-5">
          <Text className="text-white/60 text-sm mb-2">카테고리 *</Text>
          <View className="flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`w-[23%] aspect-square rounded-xl justify-center items-center border ${
                  selectedCategory === category.id
                    ? 'border-neon-mint bg-neon-mint/20'
                    : 'border-white/20 bg-white/5'
                }`}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text className="text-2xl">{category.icon}</Text>
                <Text className="text-white/60 text-xs mt-1">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 결제일 */}
        <View className="mb-5">
          <Text className="text-white/60 text-sm mb-2">결제일 *</Text>
          <TextInput
            className="bg-white/5 border border-white/20 rounded-xl p-4 text-white"
            placeholder="예: 25 (매월 25일)"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={billingDate}
            onChangeText={setBillingDate}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        {/* 결제 수단 */}
        <View className="mb-5">
          <Text className="text-white/60 text-sm mb-2">결제 수단</Text>
          <TextInput
            className="bg-white/5 border border-white/20 rounded-xl p-4 text-white"
            placeholder="예: 신한카드"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={paymentMethod}
            onChangeText={setPaymentMethod}
          />
        </View>

        {/* 메모 */}
        <View className="mb-5">
          <Text className="text-white/60 text-sm mb-2">메모</Text>
          <TextInput
            className="bg-white/5 border border-white/20 rounded-xl p-4 text-white h-24"
            placeholder="메모를 입력하세요"
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={memo}
            onChangeText={setMemo}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity
          className="rounded-xl overflow-hidden mt-3"
          onPress={handleSave}
        >
          <LinearGradient
            colors={['#00F5D4', '#00D4FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="p-4 items-center"
          >
            <Text className="text-dark font-bold text-lg">저장</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
