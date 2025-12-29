# 🎨 Fluxy 디자인 가이드

## 1. 브랜드 아이덴티티

### 1.1 앱 정보
```
이름: Fluxy
슬로건: 흐르는 돈, 한눈에
컨셉: 물 흐르는 듯한 부드러움 + 돈의 흐름 관리
```

### 1.2 로고 컨셉
```
키워드: 물결, 흐름, 부드러움, 모던
스타일: 미니멀, 곡선, 그라데이션
```

---

## 2. 컬러 시스템

### 2.1 Primary Colors
```
Primary:      #6366F1 (Indigo 500) - 메인 브랜드 컬러
Primary Dark: #4F46E5 (Indigo 600) - 버튼 pressed
Primary Light:#818CF8 (Indigo 400) - 호버, 하이라이트
```

### 2.2 Secondary Colors
```
Secondary:      #06B6D4 (Cyan 500) - 강조, 링크
Secondary Dark: #0891B2 (Cyan 600)
Secondary Light:#22D3EE (Cyan 400)
```

### 2.3 Semantic Colors
```
Success: #22C55E (Green 500) - 절약, 긍정
Warning: #F59E0B (Amber 500) - 주의, 알림
Danger:  #EF4444 (Red 500)   - 초과, 경고
Info:    #3B82F6 (Blue 500)  - 정보
```

### 2.4 Neutral Colors
```
Gray 900: #111827 - 메인 텍스트
Gray 700: #374151 - 서브 텍스트
Gray 500: #6B7280 - 비활성 텍스트
Gray 300: #D1D5DB - 보더
Gray 100: #F3F4F6 - 배경
Gray 50:  #F9FAFB - 카드 배경
White:    #FFFFFF - 기본 배경
```

### 2.5 카테고리 컬러
```
🏠 주거:    #FF6B6B (Coral)
📱 통신:    #4ECDC4 (Teal)
🎬 구독:    #45B7D1 (Sky Blue)
🛡️ 보험:    #96CEB4 (Sage)
🚗 교통:    #FFEAA7 (Cream Yellow)
📚 교육:    #DDA0DD (Plum)
💪 건강:    #98D8C8 (Mint)
📦 기타:    #B8B8B8 (Gray)
```

---

## 3. 타이포그래피

### 3.1 폰트
```
Primary Font: Pretendard (한글)
Fallback: SF Pro Display (iOS), Roboto (Android)
숫자 전용: SF Pro Rounded / Pretendard
```

### 3.2 폰트 스케일
```
Display:    32px / Bold   - 대시보드 총액
Heading 1:  24px / Bold   - 페이지 타이틀
Heading 2:  20px / SemiBold - 섹션 제목
Heading 3:  18px / SemiBold - 카드 제목
Body 1:     16px / Regular - 본문
Body 2:     14px / Regular - 설명, 서브텍스트
Caption:    12px / Regular - 날짜, 태그
```

### 3.3 Line Height
```
Tight:   1.2 (헤딩)
Normal:  1.5 (본문)
Relaxed: 1.75 (긴 텍스트)
```

---

## 4. 스페이싱 & 레이아웃

### 4.1 Spacing Scale (4px 베이스)
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
```

### 4.2 레이아웃
```
Screen Padding: 16px (좌우)
Card Padding:   16px
Card Gap:       12px
Section Gap:    24px
```

### 4.3 Border Radius
```
sm:   8px  - 버튼, 인풋
md:   12px - 카드
lg:   16px - 모달
xl:   24px - 바텀시트
full: 9999px - 아바타, 태그
```

---

## 5. 컴포넌트 스펙

### 5.1 버튼

#### Primary Button
```
Height: 48px (Large), 40px (Medium), 32px (Small)
Padding: 16px 24px
Background: Primary (#6366F1)
Text: White, 16px, SemiBold
Border Radius: 12px
Shadow: 0 4px 6px rgba(99, 102, 241, 0.25)

States:
- Hover: Primary Dark (#4F46E5)
- Pressed: Primary Dark + Scale 0.98
- Disabled: Gray 300, opacity 0.5
```

#### Secondary Button (Outline)
```
Background: Transparent
Border: 1.5px solid Primary
Text: Primary, 16px, SemiBold
```

### 5.2 카드

#### 기본 카드
```
Background: White
Border Radius: 16px
Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)
Padding: 16px
```

#### 지출 아이템 카드
```
Height: 72px
Layout: [Icon 40px] [Name + Category] [Amount]
Gap: 12px
```

### 5.3 인풋

```
Height: 48px
Background: Gray 50
Border: 1.5px solid Gray 300
Border Radius: 12px
Padding: 12px 16px
Font: 16px Regular

States:
- Focus: Border Primary, Shadow 0 0 0 3px Primary/20%
- Error: Border Danger, Shadow 0 0 0 3px Danger/20%
```

### 5.4 탭 바 (Bottom Navigation)

```
Height: 84px (iPhone 홈인디케이터 포함)
Background: White
Shadow: 0 -2px 10px rgba(0, 0, 0, 0.05)
Items: 4개 (홈, 목록, 캘린더, 설정)

Active: Primary + 아이콘 fill
Inactive: Gray 500
```

### 5.5 Progress Bar

```
Height: 8px
Background: Gray 200
Fill: Primary (또는 Gradient)
Border Radius: full

Gradient Option:
  from: #6366F1
  to: #06B6D4
```

---

## 6. 아이콘 가이드

### 6.1 아이콘 라이브러리
```
권장: Lucide React / Phosphor Icons
스타일: Outline (기본), Filled (활성)
크기: 20px (기본), 24px (네비게이션), 40px (카테고리)
```

### 6.2 카테고리 아이콘
```
주거: Home / House
통신: Smartphone / Phone
구독: Play / Film
보험: Shield / ShieldCheck
교통: Car / Navigation
교육: BookOpen / GraduationCap
건강: Heart / Dumbbell
기타: Package / MoreHorizontal
```

---

## 7. 화면별 디자인 스펙

### 7.1 대시보드 (홈)

```
┌─────────────────────────────────┐
│ 상단 (Safe Area + 56px)         │
│ "12월" + 프로필 아바타           │
├─────────────────────────────────┤
│                                 │
│ 💰 총액 카드 (높이 160px)        │
│ ┌─────────────────────────────┐ │
│ │ 이번 달 고정지출              │ │
│ │ ₩1,247,000                  │ │
│ │ ████████░░░ 62%             │ │
│ │ 월급 대비                    │ │
│ └─────────────────────────────┘ │
│                                 │
│ 📅 다가오는 결제 (섹션)          │
│ ┌─────────────────────────────┐ │
│ │ 🎬 넷플릭스     D-3  17,000 │ │
│ ├─────────────────────────────┤ │
│ │ 📱 통신비       D-5  65,000 │ │
│ └─────────────────────────────┘ │
│                                 │
│ 📊 카테고리별 (섹션)             │
│ ┌─────────────────────────────┐ │
│ │ 가로 스크롤 카테고리 카드     │ │
│ └─────────────────────────────┘ │
│                                 │
├─────────────────────────────────┤
│ 🏠   📋   📅   ⚙️              │
│ 탭바 (84px)                     │
└─────────────────────────────────┘
```

#### 총액 카드 스펙
```
Background: Gradient (Primary → Secondary)
Text Color: White
금액: Display (32px Bold)
Progress Bar: White/30% 배경, White fill
```

### 7.2 지출 목록

```
┌─────────────────────────────────┐
│ 지출 목록           [+ 추가]    │
├─────────────────────────────────┤
│ 🔍 검색 인풋                    │
├─────────────────────────────────┤
│ 필터 탭 (전체 | 구독 | 고정 |...)│
├─────────────────────────────────┤
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🎬 넷플릭스                 │ │
│ │    구독 · 매월 25일          │ │
│ │                   ₩17,000 → │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 🏠 월세                     │ │
│ │    주거 · 매월 1일           │ │
│ │                  ₩500,000 → │ │
│ └─────────────────────────────┘ │
│                                 │
│ ... (리스트)                    │
│                                 │
├─────────────────────────────────┤
│ 탭바                            │
└─────────────────────────────────┘
```

### 7.3 지출 추가/수정

```
┌─────────────────────────────────┐
│ ← 지출 추가                     │
├─────────────────────────────────┤
│                                 │
│ 이름 *                          │
│ ┌─────────────────────────────┐ │
│ │ 넷플릭스                    │ │
│ └─────────────────────────────┘ │
│                                 │
│ 금액 *                          │
│ ┌─────────────────────────────┐ │
│ │ ₩ 17,000                   │ │
│ └─────────────────────────────┘ │
│                                 │
│ 카테고리 *                      │
│ [🏠] [📱] [🎬] [🛡️] [🚗] ...   │
│ (가로 스크롤 선택 칩)            │
│                                 │
│ 결제일 *                        │
│ ┌─────────────────────────────┐ │
│ │ 매월 25일                 ▼ │ │
│ └─────────────────────────────┘ │
│                                 │
│ 결제 수단                       │
│ ┌─────────────────────────────┐ │
│ │ 신한카드                  ▼ │ │
│ └─────────────────────────────┘ │
│                                 │
│ 메모                            │
│ ┌─────────────────────────────┐ │
│ │                             │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │           저장              │ │
│ └─────────────────────────────┘ │
│                                 │
└─────────────────────────────────┘
```

### 7.4 캘린더

```
┌─────────────────────────────────┐
│ 캘린더              2025.12     │
├─────────────────────────────────┤
│ 일 월 화 수 목 금 토            │
│  1  2  3  4  5  6  7           │
│     ●                          │
│  8  9 10 11 12 13 14           │
│        ●                       │
│ 15 16 17 18 19 20 21           │
│                                │
│ 22 23 24 25 26 27 28           │
│           ●  ●                 │
│ 29 30 31                       │
├─────────────────────────────────┤
│ 12월 25일 결제 예정             │
│ ┌─────────────────────────────┐ │
│ │ 🎬 넷플릭스        ₩17,000  │ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 📱 통신비          ₩65,000  │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ 탭바                            │
└─────────────────────────────────┘

● = 결제 있는 날 (Primary 색상 dot)
```

---

## 8. 애니메이션 & 인터랙션 (iOS 스타일)

### 8.1 핵심 원칙
```
✅ Spring 애니메이션 사용 (딱딱한 linear/ease 지양)
✅ 터치에 즉각 반응 (지연 없이)
✅ 제스처 기반 인터랙션
✅ Haptic 피드백 적극 활용
```

### 8.2 iOS Spring 설정

#### React Native Reanimated 기준
```typescript
// 기본 Spring (대부분의 애니메이션)
withSpring(value, {
  damping: 15,        // 감쇠 (낮을수록 탄성↑)
  stiffness: 150,     // 강성 (높을수록 빠름)
  mass: 1,            // 질량
})

// 부드러운 Spring (모달, 바텀시트)
withSpring(value, {
  damping: 20,
  stiffness: 100,
})

// 빠른 Spring (버튼, 토글)
withSpring(value, {
  damping: 20,
  stiffness: 300,
})

// 탄성 있는 Spring (성공 애니메이션)
withSpring(value, {
  damping: 10,
  stiffness: 100,
})
```

### 8.3 화면 전환 (iOS 네이티브 느낌)

#### Stack Navigation
```typescript
// expo-router 또는 react-navigation
screenOptions={{
  animation: 'slide_from_right',  // iOS 기본
  gestureEnabled: true,           // 스와이프 백
  gestureDirection: 'horizontal',
  
  // 커스텀 트랜지션
  transitionSpec: {
    open: {
      animation: 'spring',
      config: {
        damping: 20,
        stiffness: 200,
        mass: 0.8,
      }
    },
    close: {
      animation: 'spring',
      config: {
        damping: 20,
        stiffness: 200,
        mass: 0.8,
      }
    }
  }
}}
```

#### Modal / 바텀시트
```typescript
// 아래에서 올라오는 모달
animation: 'slide_from_bottom'

// 바텀시트 Spring
withSpring(translateY, {
  damping: 25,
  stiffness: 120,
  velocity: gestureVelocity,  // 제스처 속도 반영!
})
```

### 8.4 터치 피드백

#### 버튼/카드 터치
```typescript
// Pressable 컴포넌트
<Pressable
  onPressIn={() => {
    // 즉시 반응 (0ms 딜레이)
    scale.value = withSpring(0.97, { damping: 20, stiffness: 400 })
    runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light)
  }}
  onPressOut={() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 })
  }}
>
```

#### 스케일 값
```
버튼 탭:     0.97 (미세하게)
카드 탭:     0.98
리스트 아이템: 0.98
아이콘 버튼:  0.90
```

### 8.5 Haptic 피드백 (중요!)

```typescript
import * as Haptics from 'expo-haptics'

// 버튼 탭
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

// 토글 스위치
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

// 삭제, 중요 액션
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)

// 성공
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

// 에러
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)

// 선택 변경 (피커, 세그먼트)
Haptics.selectionAsync()
```

### 8.6 스크롤 & 제스처

#### Pull to Refresh
```typescript
// iOS 기본 스타일
<ScrollView
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#6366F1"  // Primary 컬러
    />
  }
/>
```

#### 스와이프 삭제
```typescript
// react-native-gesture-handler + reanimated
const gestureHandler = useAnimatedGestureHandler({
  onActive: (event) => {
    translateX.value = Math.max(event.translationX, -80)
  },
  onEnd: (event) => {
    if (event.translationX < -50) {
      // 삭제 버튼 노출
      translateX.value = withSpring(-80, { damping: 20 })
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium)
    } else {
      translateX.value = withSpring(0)
    }
  }
})
```

#### 바텀시트 드래그
```typescript
// 속도 기반 스냅
onEnd: (event) => {
  const shouldClose = 
    event.translationY > 100 || 
    event.velocityY > 500  // 빠르게 아래로 스와이프
  
  if (shouldClose) {
    translateY.value = withSpring(screenHeight, {
      velocity: event.velocityY,  // 제스처 속도 유지!
      damping: 20,
    })
  } else {
    translateY.value = withSpring(0)
  }
}
```

### 8.7 구체적인 애니메이션 예시

#### 총액 카드 숫자 카운트업
```typescript
// 0 → 1,247,000 부드럽게 올라가기
const animatedValue = useSharedValue(0)

useEffect(() => {
  animatedValue.value = withTiming(totalAmount, {
    duration: 800,
    easing: Easing.out(Easing.cubic),
  })
}, [totalAmount])
```

#### 프로그레스 바
```typescript
// 0% → 62% 채워지기
width.value = withSpring(`${percentage}%`, {
  damping: 20,
  stiffness: 80,
})
```

#### 리스트 아이템 등장
```typescript
// 순차적으로 페이드인 + 슬라이드업
entering={FadeInDown.delay(index * 50).springify()}
```

#### 플로팅 버튼 등장
```typescript
entering={ZoomIn.springify().damping(15)}
exiting={ZoomOut.springify()}
```

#### 성공 체크마크
```typescript
// 체크 아이콘이 통통 튀듯이
scale.value = withSequence(
  withSpring(1.2, { damping: 10 }),
  withSpring(1, { damping: 15 })
)
```

### 8.8 피해야 할 것들

```
❌ duration 기반 애니메이션 (딱딱함)
❌ linear easing
❌ 지연 없는 즉각 반응 (delayPressIn 제거)
❌ opacity만 사용 (scale 같이 써야 자연스러움)
❌ Haptic 없는 터치 (밋밋함)
```

### 8.9 라이브러리 추천

```
필수:
- react-native-reanimated (v3)
- react-native-gesture-handler
- expo-haptics

추천:
- moti (선언적 애니메이션)
- react-native-redash (유틸리티)
- @gorhom/bottom-sheet (바텀시트)
```

---

## 9. 다크모드

### 9.1 다크모드 컬러
```
Background:     #0F0F0F
Card:           #1A1A1A
Border:         #2A2A2A
Text Primary:   #FFFFFF
Text Secondary: #A0A0A0
```

### 9.2 다크모드 주의사항
```
- Primary 컬러는 유지 (약간 밝게 조정 가능)
- 그림자 대신 Border 사용
- 이미지/아이콘 밝기 조정
```

---

## 10. 피그마 프레임 사이즈

### 10.1 iPhone (기준)
```
iPhone 15 Pro: 393 x 852
iPhone SE:     375 x 667
```

### 10.2 Android (참고)
```
Pixel 7: 412 x 915
```

---

## 11. 에셋 체크리스트

### 11.1 필수 에셋
```
□ 앱 아이콘 (1024x1024)
□ 스플래시 스크린
□ 온보딩 일러스트 (3장)
□ 빈 상태 일러스트 (Empty State)
□ 카테고리 아이콘 세트
```

### 11.2 앱스토어 에셋 (나중에)
```
□ 스크린샷 (6.5", 5.5")
□ 앱 프리뷰 영상
□ 프로모션 텍스트
```

---

*Fluxy Design Guide v1.0*
