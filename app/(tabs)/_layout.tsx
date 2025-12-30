import React from 'react';
import { View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}) {
  const { focused, ...rest } = props;
  return (
    <View className="items-center">
      <FontAwesome size={22} {...rest} />
      {focused && (
        <View className="w-1 h-1 rounded-full bg-neon-mint mt-1" />
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00F5D4',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        tabBarStyle: {
          backgroundColor: '#0A1A1F',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          borderTopWidth: 1,
          height: 85,
          paddingTop: 10,
          paddingBottom: 25,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginTop: 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="home" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: '지출',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="credit-card" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: '캘린더',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="calendar" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '설정',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name="cog" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}
