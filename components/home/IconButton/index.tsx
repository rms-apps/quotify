import { Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const IconButton = ({ children, onPress }: any) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotateZ: `${rotate.value}deg` }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.85, { damping: 12 });
    rotate.value = withSpring(-5);
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 12 });
    rotate.value = withSpring(0);
  };

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={animatedStyle}
      hitSlop={10}
    >
      {children}
    </AnimatedPressable>
  );
};
