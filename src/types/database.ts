// PRD 기반 데이터베이스 타입 정의

export interface User {
  id: string;
  email: string;
  name: string | null;
  monthly_income: number | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  user_id: string | null; // null이면 기본 카테고리
  name: string;
  icon: string;
  color: string;
  order: number;
}

export interface FixedExpense {
  id: string;
  user_id: string;
  category_id: string;
  name: string;
  amount: number;
  billing_date: number; // 1-31
  payment_method: string | null;
  memo: string | null;
  is_active: boolean;
  start_date: string;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface FreeTrial {
  id: string;
  user_id: string;
  service_name: string;
  start_date: string;
  end_date: string;
  expected_amount: number;
  is_cancelled: boolean;
  cancelled_at: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  expense_id: string | null;
  trial_id: string | null;
  type: 'payment_reminder' | 'trial_ending';
  scheduled_at: string;
  sent_at: string | null;
  created_at: string;
}

export interface PaymentHistory {
  id: string;
  user_id: string;
  expense_id: string;
  amount: number;
  paid_at: string;
  created_at: string;
}

// Supabase Database 타입
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id'>;
        Update: Partial<Omit<Category, 'id'>>;
      };
      fixed_expenses: {
        Row: FixedExpense;
        Insert: Omit<FixedExpense, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FixedExpense, 'id'>>;
      };
      free_trials: {
        Row: FreeTrial;
        Insert: Omit<FreeTrial, 'id' | 'created_at'>;
        Update: Partial<Omit<FreeTrial, 'id'>>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, 'id' | 'created_at'>;
        Update: Partial<Omit<Notification, 'id'>>;
      };
      payment_history: {
        Row: PaymentHistory;
        Insert: Omit<PaymentHistory, 'id' | 'created_at'>;
        Update: Partial<Omit<PaymentHistory, 'id'>>;
      };
    };
  };
}
