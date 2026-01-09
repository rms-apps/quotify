import { Quote } from '@/lib/api/quotes';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type FeedQuoteProps = {
  quote: Quote;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FeedQuote = ({ quote }: FeedQuoteProps) => {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotateZ: `${rotate.value}deg` }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.97, { damping: 12 });
    rotate.value = withSpring(-1.5);
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 12 });
    rotate.value = withSpring(0);
  };

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.card, animatedStyle]}
    >
      <Text style={styles.text}>"{quote.text}"</Text>

      {quote.author && (
        <Text style={styles.author}>
          — {quote.author === 'Unknown' ? 'Anonymous' : quote.author}
        </Text>
      )}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,

    // Soft iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },

    // Android
    elevation: 3,
  },

  text: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
    color: '#111',
  },

  author: {
    marginTop: 12,
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
    textAlign: 'right',
  },
});
