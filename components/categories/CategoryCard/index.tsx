import { QuoteCategory } from '@/lib/api/quotes';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ColorValue,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SCREEN_WIDTH = Dimensions.get('window').width;

export type CategoryCardItem = {
  name: QuoteCategory;
  description: string;
  colors: readonly [ColorValue, ColorValue, ...ColorValue[]];
  icon: any;
};

export const CategoryCard = ({
  item,
  onPress,
}: {
  item: CategoryCardItem;
  onPress: () => void;
}) => {
  const scale = useSharedValue(1);
  const tilt = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotateX: `${tilt.value}deg` },
      { rotateY: `${tilt.value}deg` },
    ],
  }));

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.95, { damping: 10, stiffness: 150 });
        tilt.value = withSpring(5, { damping: 10, stiffness: 120 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 10, stiffness: 150 });
        tilt.value = withSpring(0, { damping: 10, stiffness: 120 });
      }}
      onPress={onPress}
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        width: (SCREEN_WIDTH - 40 - 16) / 2,
      }}
    >
      <Animated.View style={animatedStyle}>
        <LinearGradient
          colors={item.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 24,
            paddingVertical: 24,
            paddingHorizontal: 18,
            elevation: 8,
            shadowRadius: 12,
            shadowOpacity: 0.35,
            shadowColor: item.colors[1],
          }}
        >
          <View
            style={{
              height: 85,
              borderRadius: 20,
              marginBottom: 14,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.18)',
            }}
          >
            <Image
              source={item.icon}
              style={{ width: 60, height: 60, resizeMode: 'contain' }}
            />
          </View>

          <Text className="font-bold text-white text-xl">{item.name}</Text>

          <Text className="text-gray-100 text-sm mt-1">{item.description}</Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};
