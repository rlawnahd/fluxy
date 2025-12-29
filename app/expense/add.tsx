import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';

const categories = [
  { id: '1', name: '주거', icon: '🏠', color: '#FF6B6B' },
  { id: '2', name: '통신', icon: '📱', color: '#4ECDC4' },
  { id: '3', name: '구독', icon: '🎬', color: '#45B7D1' },
  { id: '4', name: '보험', icon: '🛡️', color: '#96CEB4' },
  { id: '5', name: '교통', icon: '🚗', color: '#FFEAA7' },
  { id: '6', name: '교육', icon: '📚', color: '#DDA0DD' },
  { id: '7', name: '건강', icon: '💪', color: '#98D8C8' },
  { id: '8', name: '기타', icon: '📦', color: '#B8B8B8' },
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

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);

  return (
    <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
      <View className="p-5 gap-5">
        {/* 이름 */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-gray-800">이름 *</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl p-4 text-base"
            placeholder="예: 넷플릭스"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* 금액 */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-gray-800">금액 *</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl p-4 text-base"
            placeholder="예: 17000"
            placeholderTextColor="#999"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* 카테고리 */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-gray-800">카테고리 *</Text>
          <View className="flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`w-[23%] aspect-square bg-white rounded-xl border justify-center items-center gap-1 ${
                  selectedCategory === category.id ? 'border-2' : 'border-gray-200'
                }`}
                style={{
                  borderColor: selectedCategory === category.id ? category.color : '#E5E7EB',
                  backgroundColor: selectedCategory === category.id ? category.color + '20' : '#fff',
                }}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text className="text-2xl">{category.icon}</Text>
                <Text className="text-xs text-gray-500">{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 결제일 */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-gray-800">결제일 *</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl p-4 text-base"
            placeholder="예: 25 (매월 25일)"
            placeholderTextColor="#999"
            value={billingDate}
            onChangeText={setBillingDate}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>

        {/* 결제 수단 */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-gray-800">결제 수단</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl p-4 text-base"
            placeholder="예: 신한카드"
            placeholderTextColor="#999"
            value={paymentMethod}
            onChangeText={setPaymentMethod}
          />
        </View>

        {/* 메모 */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-gray-800">메모</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-xl p-4 text-base h-24"
            placeholder="메모를 입력하세요"
            placeholderTextColor="#999"
            value={memo}
            onChangeText={setMemo}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* 저장 버튼 */}
        <TouchableOpacity
          className="bg-primary rounded-xl p-4 items-center mt-3"
          onPress={handleSave}
        >
          <Text className="text-white text-lg font-semibold">저장</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
