-- Fluxy 데이터베이스 스키마
-- Supabase SQL Editor에서 실행

-- 1. profiles 테이블 (users 대신 - Supabase Auth와 연동)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  monthly_income INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. categories 테이블
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. fixed_expenses 테이블
CREATE TABLE IF NOT EXISTS fixed_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  amount INTEGER NOT NULL,
  billing_date INTEGER NOT NULL CHECK (billing_date >= 1 AND billing_date <= 31),
  payment_method TEXT,
  memo TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. free_trials 테이블
CREATE TABLE IF NOT EXISTS free_trials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  expected_amount INTEGER NOT NULL,
  is_cancelled BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. notifications 테이블
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  expense_id UUID REFERENCES fixed_expenses(id) ON DELETE CASCADE,
  trial_id UUID REFERENCES free_trials(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('payment_reminder', 'trial_ending')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. payment_history 테이블
CREATE TABLE IF NOT EXISTS payment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  expense_id UUID NOT NULL REFERENCES fixed_expenses(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  paid_at DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 기본 카테고리 삽입 (user_id가 NULL이면 시스템 기본 카테고리)
INSERT INTO categories (user_id, name, icon, color, "order") VALUES
  (NULL, '주거', '🏠', '#FF6B6B', 1),
  (NULL, '통신', '📱', '#4ECDC4', 2),
  (NULL, '구독', '🎬', '#45B7D1', 3),
  (NULL, '보험', '🛡️', '#96CEB4', 4),
  (NULL, '교통', '🚗', '#FFEAA7', 5),
  (NULL, '교육', '📚', '#DDA0DD', 6),
  (NULL, '건강', '💪', '#98D8C8', 7),
  (NULL, '기타', '📦', '#B8B8B8', 8)
ON CONFLICT DO NOTHING;

-- RLS (Row Level Security) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE fixed_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE free_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- RLS 정책: profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS 정책: categories (기본 카테고리는 모두 조회 가능, 커스텀은 본인만)
CREATE POLICY "Anyone can view default categories" ON categories
  FOR SELECT USING (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Users can manage own categories" ON categories
  FOR ALL USING (auth.uid() = user_id);

-- RLS 정책: fixed_expenses
CREATE POLICY "Users can view own expenses" ON fixed_expenses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own expenses" ON fixed_expenses
  FOR ALL USING (auth.uid() = user_id);

-- RLS 정책: free_trials
CREATE POLICY "Users can view own trials" ON free_trials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own trials" ON free_trials
  FOR ALL USING (auth.uid() = user_id);

-- RLS 정책: notifications
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own notifications" ON notifications
  FOR ALL USING (auth.uid() = user_id);

-- RLS 정책: payment_history
CREATE POLICY "Users can view own payment history" ON payment_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own payment history" ON payment_history
  FOR ALL USING (auth.uid() = user_id);

-- 자동으로 profile 생성하는 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 기존 트리거가 있으면 삭제 후 재생성
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- updated_at 자동 갱신 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- updated_at 트리거
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fixed_expenses_updated_at
  BEFORE UPDATE ON fixed_expenses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
