import '../global.css';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useAuth } from '@src/hooks/useAuth';

export { ErrorBoundary } from 'expo-router';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, isInitialized, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // 로그인되지 않았고 auth 그룹이 아니면 로그인으로 이동
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // 로그인되었고 auth 그룹이면 홈으로 이동
      router.replace('/(tabs)');
    }
  }, [session, isInitialized, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <RootLayoutNav />
    </QueryClientProvider>
  );
}

const FluxyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#00F5D4',
    background: '#0A1A1F',
    card: '#0A1A1F',
    text: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.1)',
    notification: '#00F5D4',
  },
};

function RootLayoutNav() {
  return (
    <ThemeProvider value={FluxyDarkTheme}>
      <AuthGuard>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#0A1A1F' },
          }}
        >
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="expense/add"
            options={{
              presentation: 'modal',
              headerShown: true,
              title: '지출 추가',
              headerStyle: { backgroundColor: '#0A1A1F' },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: { fontWeight: '600' },
            }}
          />
          <Stack.Screen
            name="expense/[id]"
            options={{
              headerShown: true,
              title: '지출 상세',
              headerStyle: { backgroundColor: '#0A1A1F' },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: { fontWeight: '600' },
              headerTransparent: true,
            }}
          />
        </Stack>
      </AuthGuard>
    </ThemeProvider>
  );
}
