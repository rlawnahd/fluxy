import { View, ViewProps } from 'react-native';

interface GlassCardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({ className = '', children, style, ...props }: GlassCardProps) {
  return (
    <View
      className={`rounded-2xl border border-white/20 overflow-hidden ${className}`}
      style={[
        {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
