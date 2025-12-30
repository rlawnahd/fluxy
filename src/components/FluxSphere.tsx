import { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Easing, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Gyroscope는 네이티브에서만 동작
let Gyroscope: any = null;
if (Platform.OS !== 'web') {
  try {
    Gyroscope = require('expo-sensors').Gyroscope;
  } catch (e) {
    // expo-sensors not available
  }
}

// Haptics는 네이티브에서만 동작
const triggerHaptic = () => {
  if (Platform.OS === 'web') return;
  try {
    const Haptics = require('expo-haptics');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch (e) {}
};

interface FluxSphereProps {
  percentage: number;
  amount: number;
  salary?: number;
}

type SphereState = 'safe' | 'warning' | 'danger';

const getState = (percentage: number): SphereState => {
  if (percentage < 30) return 'safe';
  if (percentage < 60) return 'warning';
  return 'danger';
};

const stateConfig = {
  safe: {
    liquidColors: ['#00F5D4', '#00D4FF', '#00F5D4'] as const,
    glowColor: 'rgba(0, 245, 212, 0.4)',
    shadowColor: '#00F5D4',
    label: '안정적인 지출이에요',
    bubbleSpeed: 4000,
  },
  warning: {
    liquidColors: ['#E8FF00', '#FFD700', '#E8FF00'] as const,
    glowColor: 'rgba(232, 255, 0, 0.4)',
    shadowColor: '#E8FF00',
    label: '지출을 점검해보세요',
    bubbleSpeed: 2500,
  },
  danger: {
    liquidColors: ['#FF6B6B', '#FF4757', '#FF6B6B'] as const,
    glowColor: 'rgba(255, 107, 107, 0.5)',
    shadowColor: '#FF6B6B',
    label: '지출이 월급을 삼키고 있어요!',
    bubbleSpeed: 1500,
  },
};

export function FluxSphere({ percentage, amount, salary = 0 }: FluxSphereProps) {
  const state = getState(percentage);
  const config = stateConfig[state];

  // Gyroscope tilt values
  const tiltX = useRef(new Animated.Value(0)).current;
  const tiltY = useRef(new Animated.Value(0)).current;

  // Wave animations
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;

  // Bubble animations
  const bubble1Y = useRef(new Animated.Value(0)).current;
  const bubble2Y = useRef(new Animated.Value(0)).current;
  const bubble3Y = useRef(new Animated.Value(0)).current;

  // Glow pulse
  const glowPulse = useRef(new Animated.Value(0.6)).current;

  // Danger pulse
  const dangerPulse = useRef(new Animated.Value(1)).current;

  // Gyroscope subscription
  useEffect(() => {
    if (!Gyroscope || Platform.OS === 'web') return;

    Gyroscope.setUpdateInterval(50);
    const subscription = Gyroscope.addListener((data: { x: number; y: number; z: number }) => {
      // Smooth tilt animation based on gyroscope
      Animated.spring(tiltX, {
        toValue: Math.max(-15, Math.min(15, data.y * 20)),
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();

      Animated.spring(tiltY, {
        toValue: Math.max(-15, Math.min(15, data.x * 20)),
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }).start();
    });

    return () => subscription.remove();
  }, []);

  // Wave animations
  useEffect(() => {
    const createWave = (anim: Animated.Value, duration: number, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      );
    };

    const w1 = createWave(wave1, 2000, 0);
    const w2 = createWave(wave2, 2500, 300);
    const w3 = createWave(wave3, 1800, 600);

    w1.start();
    w2.start();
    w3.start();

    return () => {
      w1.stop();
      w2.stop();
      w3.stop();
    };
  }, []);

  // Bubble animations
  useEffect(() => {
    const createBubble = (anim: Animated.Value, duration: number, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: duration,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const b1 = createBubble(bubble1Y, config.bubbleSpeed, 0);
    const b2 = createBubble(bubble2Y, config.bubbleSpeed * 1.2, 500);
    const b3 = createBubble(bubble3Y, config.bubbleSpeed * 0.8, 1000);

    b1.start();
    b2.start();
    b3.start();

    return () => {
      b1.stop();
      b2.stop();
      b3.stop();
    };
  }, [config.bubbleSpeed]);

  // Glow pulse animation
  useEffect(() => {
    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0.6,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    glow.start();
    return () => glow.stop();
  }, []);

  // Danger state pulse
  useEffect(() => {
    if (state === 'danger') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(dangerPulse, {
            toValue: 1.08,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(dangerPulse, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      triggerHaptic();
      return () => pulse.stop();
    } else {
      dangerPulse.setValue(1);
    }
  }, [state]);

  // Interpolations
  const wave1TranslateY = wave1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });
  const wave2TranslateY = wave2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });
  const wave3TranslateY = wave3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const bubble1TranslateY = bubble1Y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });
  const bubble1Opacity = bubble1Y.interpolate({
    inputRange: [0, 0.3, 0.8, 1],
    outputRange: [0, 0.8, 0.4, 0],
  });

  const bubble2TranslateY = bubble2Y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -70],
  });
  const bubble2Opacity = bubble2Y.interpolate({
    inputRange: [0, 0.3, 0.8, 1],
    outputRange: [0, 0.6, 0.3, 0],
  });

  const bubble3TranslateY = bubble3Y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -90],
  });
  const bubble3Opacity = bubble3Y.interpolate({
    inputRange: [0, 0.3, 0.8, 1],
    outputRange: [0, 0.7, 0.35, 0],
  });

  const fillHeight = Math.min(percentage, 100);

  return (
    <View style={styles.container}>
      {/* Outer glow */}
      <Animated.View
        style={[
          styles.outerGlow,
          {
            backgroundColor: config.glowColor,
            opacity: glowPulse,
            transform: [{ scale: dangerPulse }],
          },
        ]}
      />

      {/* Main Sphere with gyroscope tilt */}
      <Animated.View
        style={[
          styles.sphere,
          {
            transform: [
              { scale: dangerPulse },
              { rotateX: tiltX.interpolate({ inputRange: [-15, 15], outputRange: ['-15deg', '15deg'] }) },
              { rotateY: tiltY.interpolate({ inputRange: [-15, 15], outputRange: ['-15deg', '15deg'] }) },
            ],
            shadowColor: config.shadowColor,
          },
        ]}
      >
        {/* Glass background */}
        <LinearGradient
          colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)']}
          style={styles.glassBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Liquid container */}
        <View style={[styles.liquidContainer, { height: `${fillHeight}%` }]}>
          {/* Main liquid gradient */}
          <LinearGradient
            colors={[...config.liquidColors]}
            style={styles.liquid}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />

          {/* Wave layers */}
          <Animated.View
            style={[
              styles.wave,
              styles.wave1,
              { transform: [{ translateY: wave1TranslateY }] },
            ]}
          >
            <LinearGradient
              colors={[config.liquidColors[0], 'transparent']}
              style={styles.waveGradient}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.wave,
              styles.wave2,
              { transform: [{ translateY: wave2TranslateY }] },
            ]}
          >
            <LinearGradient
              colors={[config.liquidColors[1], 'transparent']}
              style={styles.waveGradient}
            />
          </Animated.View>

          <Animated.View
            style={[
              styles.wave,
              styles.wave3,
              { transform: [{ translateY: wave3TranslateY }] },
            ]}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.3)', 'transparent']}
              style={styles.waveGradient}
            />
          </Animated.View>

          {/* Bubbles */}
          <Animated.View
            style={[
              styles.bubble,
              {
                left: '25%',
                bottom: 10,
                width: 8,
                height: 8,
                transform: [{ translateY: bubble1TranslateY }],
                opacity: bubble1Opacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.bubble,
              {
                left: '55%',
                bottom: 20,
                width: 12,
                height: 12,
                transform: [{ translateY: bubble2TranslateY }],
                opacity: bubble2Opacity,
              },
            ]}
          />
          <Animated.View
            style={[
              styles.bubble,
              {
                left: '40%',
                bottom: 5,
                width: 6,
                height: 6,
                transform: [{ translateY: bubble3TranslateY }],
                opacity: bubble3Opacity,
              },
            ]}
          />
        </View>

        {/* Glass reflections */}
        <View style={styles.reflection1} />
        <View style={styles.reflection2} />
        <View style={styles.reflection3} />

        {/* Inner rim highlight */}
        <View style={styles.innerRim} />

        {/* Percentage text */}
        <View style={styles.textContainer}>
          <Text style={[styles.percentText, fillHeight > 50 && styles.percentTextLight]}>
            {percentage}
            <Text style={styles.percentSymbol}>%</Text>
          </Text>
        </View>
      </Animated.View>

      {/* Amount display */}
      <Text style={styles.amountText}>
        ₩{amount.toLocaleString()}
      </Text>
      <Text style={styles.salaryText}>
        {salary > 0 ? `월급 ${salary.toLocaleString()}원 중` : '이번 달 고정지출'}
      </Text>

      {/* Status badge */}
      <View style={[styles.statusBadge, { backgroundColor: config.glowColor }]}>
        <Text style={[styles.statusText, { color: config.liquidColors[0] }]}>
          {config.label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  outerGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    top: 10,
  },
  sphere: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  liquidContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  liquid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  wave: {
    position: 'absolute',
    left: -10,
    right: -10,
    height: 30,
  },
  wave1: {
    top: -15,
  },
  wave2: {
    top: -10,
    opacity: 0.7,
  },
  wave3: {
    top: -20,
    opacity: 0.5,
  },
  waveGradient: {
    flex: 1,
    borderRadius: 20,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 50,
  },
  reflection1: {
    position: 'absolute',
    top: 20,
    left: 25,
    width: 60,
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 30,
    transform: [{ rotate: '-30deg' }],
  },
  reflection2: {
    position: 'absolute',
    top: 45,
    left: 40,
    width: 30,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    transform: [{ rotate: '-30deg' }],
  },
  reflection3: {
    position: 'absolute',
    top: 15,
    right: 30,
    width: 15,
    height: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  innerRim: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00F5D4',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  percentTextLight: {
    color: '#FFFFFF',
  },
  percentSymbol: {
    fontSize: 28,
  },
  amountText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  salaryText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 4,
  },
  statusBadge: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
