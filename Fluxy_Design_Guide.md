# Fluxy 디자인 가이드

## 1. 브랜드 아이덴티티

### 1.1 앱 정보
```
이름: Fluxy
슬로건: 흐르는 돈, 한눈에
컨셉: Deep Teal + Glassmorphism + Neon Accents
```

### 1.2 디자인 컨셉
```
키워드: 다크, 글래스모피즘, 네온, 모던, 프리미엄
스타일: 다크 UI, 반투명 카드, 그라데이션 액센트
```

---

## 2. 컬러 시스템

### 2.1 Background Colors (Deep Teal)
```
Dark:       #0A1A1F - 기본 배경
Dark 100:   #0D2530 - 그라데이션 중간
Dark 200:   #0F2D3A - 서브 배경
Dark 300:   #143D4D - 그라데이션 끝
Dark 400:   #1A4D5E - 강조 배경
```

### 2.2 Neon Accent Colors
```
Neon Mint:   #00F5D4 - Primary 액센트, 활성 상태
Neon Yellow: #E8FF00 - 경고, 강조 포인트
Neon Cyan:   #00D4FF - Secondary 액센트, 그라데이션
```

### 2.3 Semantic Colors
```
Primary:   #00F5D4 - 메인 액션
Secondary: #00D4FF - 보조 액션
Accent:    #E8FF00 - 특별 강조
Danger:    #FF6B6B - 삭제, 경고
Success:   #00F5D4 - 성공 (Primary와 동일)
```

### 2.4 Glass Colors (Glassmorphism)
```
Glass White:  rgba(255, 255, 255, 0.1)  - 카드 배경
Glass Light:  rgba(255, 255, 255, 0.15) - 호버 상태
Glass Border: rgba(255, 255, 255, 0.2)  - 카드 테두리
```

### 2.5 Text Colors
```
White:       #FFFFFF           - 메인 텍스트
White 80:    rgba(255,255,255,0.8)  - 본문
White 60:    rgba(255,255,255,0.6)  - 레이블
White 40:    rgba(255,255,255,0.4)  - 비활성, 서브텍스트
White 30:    rgba(255,255,255,0.3)  - 플레이스홀더
```

### 2.6 카테고리 컬러 (이모지 기반)
```
주거: 🏠
통신: 📱
구독: 🎬
보험: 🛡️
교통: 🚗
교육: 📚
건강: 💪
기타: 📦
```

---

## 3. Tailwind 설정

### 3.1 tailwind.config.js
```javascript
colors: {
  dark: {
    DEFAULT: '#0A1A1F',
    100: '#0D2530',
    200: '#0F2D3A',
    300: '#143D4D',
    400: '#1A4D5E',
  },
  neon: {
    yellow: '#E8FF00',
    mint: '#00F5D4',
    cyan: '#00D4FF',
  },
  glass: {
    white: 'rgba(255, 255, 255, 0.1)',
    light: 'rgba(255, 255, 255, 0.15)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  primary: '#00F5D4',
  secondary: '#00D4FF',
  accent: '#E8FF00',
  danger: '#FF6B6B',
}
```

---

## 4. 타이포그래피

### 4.1 폰트
```
Primary Font: System Default (iOS: SF Pro, Android: Roboto)
숫자 전용: System Default Tabular
```

### 4.2 폰트 스케일
```
Display:    text-4xl / font-bold   - 대시보드 총액 (36px)
Heading 1:  text-2xl / font-bold   - 페이지 타이틀 (24px)
Heading 2:  text-xl  / font-semibold - 섹션 제목 (20px)
Heading 3:  text-lg  / font-semibold - 카드 제목 (18px)
Body:       text-base / font-medium  - 본문 (16px)
Small:      text-sm  / font-normal   - 설명, 서브텍스트 (14px)
Caption:    text-xs  / font-normal   - 날짜, 태그 (12px)
```

---

## 5. 스페이싱 & 레이아웃

### 5.1 Spacing Scale (Tailwind 기본)
```
1:   4px   (p-1)
2:   8px   (p-2)
3:   12px  (p-3)
4:   16px  (p-4)
5:   20px  (p-5)
6:   24px  (p-6)
8:   32px  (p-8)
```

### 5.2 레이아웃
```
Screen Padding: p-5 (20px)
Card Padding:   p-4 또는 p-5
Card Gap:       gap-3 (12px)
Section Gap:    mb-6 (24px)
```

### 5.3 Border Radius
```
sm:     rounded-lg  (8px)
md:     rounded-xl  (12px)
lg:     rounded-2xl (16px)
full:   rounded-full (원형)
```

---

## 6. 컴포넌트 스펙

### 6.1 배경 그라데이션

```tsx
<LinearGradient
  colors={['#0A1A1F', '#0D2530', '#143D4D']}
  className="absolute inset-0"
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
/>
```

### 6.2 GlassCard (Glassmorphism)

```tsx
// src/components/GlassCard.tsx
<View
  className="rounded-2xl border border-white/20 overflow-hidden"
  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
>
  {children}
</View>
```

#### 사용 예시
```tsx
<GlassCard className="p-5">
  <Text className="text-white">Content</Text>
</GlassCard>
```

### 6.3 버튼

#### Primary Button (그라데이션)
```tsx
<TouchableOpacity className="rounded-xl overflow-hidden">
  <LinearGradient
    colors={['#00F5D4', '#00D4FF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    className="p-4 items-center"
  >
    <Text className="text-dark font-bold text-lg">저장</Text>
  </LinearGradient>
</TouchableOpacity>
```

#### Glass Button
```tsx
<TouchableOpacity className="rounded-xl overflow-hidden">
  <GlassCard className="flex-row justify-center items-center gap-2 p-4">
    <FontAwesome name="pencil" size={16} color="#00F5D4" />
    <Text className="text-neon-mint font-semibold">수정</Text>
  </GlassCard>
</TouchableOpacity>
```

#### Danger Button
```tsx
<GlassCard className="flex-row justify-center items-center gap-2 p-4 border-danger">
  <FontAwesome name="trash" size={16} color="#FF6B6B" />
  <Text className="text-danger font-semibold">삭제</Text>
</GlassCard>
```

### 6.4 인풋

```tsx
<TextInput
  className="bg-white/5 border border-white/20 rounded-xl p-4 text-white"
  placeholder="예: 넷플릭스"
  placeholderTextColor="rgba(255,255,255,0.3)"
/>
```

### 6.5 탭 바

```tsx
tabBarStyle: {
  backgroundColor: '#0A1A1F',
  borderTopColor: 'rgba(255, 255, 255, 0.1)',
  borderTopWidth: 1,
  height: 85,
  paddingTop: 10,
  paddingBottom: 25,
}
tabBarActiveTintColor: '#00F5D4'
tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)'
```

### 6.6 Progress Bar

```tsx
<View className="h-2 bg-white/10 rounded-full overflow-hidden">
  <LinearGradient
    colors={['#00F5D4', '#00D4FF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    className="h-full"
    style={{ width: `${percentage}%` }}
  />
</View>
```

### 6.7 카테고리 아이콘 (원형 그라데이션)

```tsx
<View className="w-12 h-12 rounded-full overflow-hidden">
  <LinearGradient
    colors={['#00F5D4', '#00D4FF']}
    className="w-full h-full justify-center items-center"
  >
    <Text className="text-xl">🎬</Text>
  </LinearGradient>
</View>
```

---

## 7. 화면별 디자인 스펙

### 7.1 대시보드 (홈)

```
┌─────────────────────────────────┐
│ [Deep Teal Gradient Background] │
├─────────────────────────────────┤
│ 상단: SafeAreaView              │
│ "12월" (text-2xl font-bold)     │
├─────────────────────────────────┤
│                                 │
│ [GlassCard - 총액]              │
│ ┌─────────────────────────────┐ │
│ │ 이번 달 고정지출              │ │
│ │ ₩1,247,000 (text-4xl mint)  │ │
│ │ [Gradient Progress Bar]     │ │
│ │ 월급 대비 62%                │ │
│ └─────────────────────────────┘ │
│                                 │
│ 다가오는 결제                    │
│ [GlassCard List]                │
│ ┌─────────────────────────────┐ │
│ │ 🎬 넷플릭스  D-3   ₩17,000  │ │
│ │ 📱 통신비    D-5   ₩65,000  │ │
│ └─────────────────────────────┘ │
│                                 │
│ 카테고리별 지출                  │
│ [Horizontal Scroll GlassCards] │
│                                 │
├─────────────────────────────────┤
│ [Dark Tab Bar - Neon Active]   │
│ 🏠   💳   📅   ⚙️              │
└─────────────────────────────────┘
```

### 7.2 지출 목록

```
┌─────────────────────────────────┐
│ [Deep Teal Gradient Background] │
├─────────────────────────────────┤
│ 고정지출        [+ Gradient FAB]│
│ 6개 · ₩1,247,000/월            │
├─────────────────────────────────┤
│                                 │
│ [GlassCard List - Touchable]   │
│ ┌─────────────────────────────┐ │
│ │ [Icon] 넷플릭스   ₩17,000 → │ │
│ │        구독 · 매월 25일      │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [Icon] 월세      ₩550,000 → │ │
│ │        주거 · 매월 25일      │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│ [Dark Tab Bar]                 │
└─────────────────────────────────┘
```

### 7.3 지출 추가/수정

```
┌─────────────────────────────────┐
│ [Dark Header - 지출 추가]       │
├─────────────────────────────────┤
│ [Deep Teal Gradient Background] │
│                                 │
│ 이름 * (text-white/60)         │
│ [Glass Input]                  │
│                                 │
│ 금액 *                         │
│ [Glass Input - numeric]        │
│                                 │
│ 카테고리 *                      │
│ [Category Grid - 4 columns]    │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐       │
│ │🏠│ │📱│ │🎬│ │🛡️│        │
│ └───┘ └───┘ └───┘ └───┘       │
│ (선택시 border-neon-mint)      │
│                                 │
│ 결제일 *                        │
│ [Glass Input]                  │
│                                 │
│ 결제 수단                       │
│ [Glass Input]                  │
│                                 │
│ 메모                           │
│ [Glass Input - multiline]      │
│                                 │
│ [Gradient Button - 저장]       │
│                                 │
└─────────────────────────────────┘
```

### 7.4 캘린더

```
┌─────────────────────────────────┐
│ [Deep Teal Gradient Background] │
├─────────────────────────────────┤
│ 2025년 1월                      │
├─────────────────────────────────┤
│ [GlassCard - Calendar]         │
│ 일 월 화 수 목 금 토            │
│ (일: red-400, 토: blue-400)    │
│                                 │
│ 오늘: [Gradient Circle]        │
│ 결제일: [Yellow Dot] ●         │
│                                 │
├─────────────────────────────────┤
│ 이번 달 남은 결제               │
│ [GlassCard List]               │
│ ┌─────────────────────────────┐ │
│ │ 🎬 넷플릭스  1/25  ₩17,000  │ │
│ │ 📱 통신비    1/27  ₩65,000  │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│ [Dark Tab Bar]                 │
└─────────────────────────────────┘
```

### 7.5 설정

```
┌─────────────────────────────────┐
│ [Deep Teal Gradient Background] │
├─────────────────────────────────┤
│ 설정 (text-2xl font-bold)      │
├─────────────────────────────────┤
│                                 │
│ [GlassCard - Profile]          │
│ ┌─────────────────────────────┐ │
│ │ [Gradient Avatar] 사용자     │ │
│ │                 email@...   │ │
│ └─────────────────────────────┘ │
│                                 │
│ 일반 (text-white/40)           │
│ [GlassCard - Settings List]    │
│ ┌─────────────────────────────┐ │
│ │ 🔔 알림 설정              → │ │
│ │ 🏷️ 카테고리 관리          → │ │
│ │ 💰 월급 설정              → │ │
│ └─────────────────────────────┘ │
│                                 │
│ 기타                           │
│ [GlassCard - Settings List]    │
│ ┌─────────────────────────────┐ │
│ │ ❓ 도움말                  → │ │
│ │ ℹ️ 앱 정보                 → │ │
│ │ 🚪 로그아웃 (text-danger)  → │ │
│ └─────────────────────────────┘ │
│                                 │
│ Fluxy v1.0.0 (text-white/30)   │
│                                 │
├─────────────────────────────────┤
│ [Dark Tab Bar]                 │
└─────────────────────────────────┘
```

---

## 8. 애니메이션 & 인터랙션

### 8.1 핵심 원칙
```
- Spring 애니메이션 사용
- 터치에 즉각 반응
- Haptic 피드백 활용
- 부드러운 전환
```

### 8.2 권장 라이브러리
```
- react-native-reanimated (v3)
- react-native-gesture-handler
- expo-haptics
- expo-linear-gradient
```

### 8.3 터치 피드백
```typescript
// 버튼 탭: scale 0.97
// 카드 탭: scale 0.98
// Haptic: Light impact
```

---

## 9. 아이콘 가이드

### 9.1 아이콘 라이브러리
```
사용: @expo/vector-icons (FontAwesome)
스타일: Solid
크기: 16px (버튼), 18px (리스트), 22px (탭바), 28px (프로필)
```

### 9.2 주요 아이콘
```
홈:      home
지출:    credit-card
캘린더:  calendar
설정:    cog
추가:    plus
수정:    pencil
삭제:    trash
뒤로:    chevron-left
더보기:  chevron-right
```

---

## 10. 테마 설정

### 10.1 Navigation Theme
```typescript
const FluxyDarkTheme = {
  dark: true,
  colors: {
    primary: '#00F5D4',
    background: '#0A1A1F',
    card: '#0A1A1F',
    text: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.1)',
    notification: '#00F5D4',
  },
};
```

---

## 11. 에셋 체크리스트

### 11.1 필수 에셋
```
□ 앱 아이콘 (1024x1024) - Deep Teal + Neon Mint
□ 스플래시 스크린 - Deep Teal 배경
□ 온보딩 일러스트 (선택)
□ 빈 상태 일러스트 (Empty State)
```

### 11.2 앱스토어 에셋 (나중에)
```
□ 스크린샷 (6.5", 5.5")
□ 앱 프리뷰 영상
□ 프로모션 텍스트
```

---

*Fluxy Design Guide v2.0 - Deep Teal + Glassmorphism*
