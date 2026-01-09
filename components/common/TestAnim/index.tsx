import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

export default function TestAnim() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0))}
      onPressOut={() => (scale.value = withSpring(1))}
    >
      <Animated.View
        style={[
          { width: 100, height: 100, backgroundColor: 'red' },
          animatedStyle,
        ]}
      />
    </Pressable>
  );
}
