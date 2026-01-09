import { Quote } from '@/lib/api/quotes';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { useAppColors } from '@/lib/hooks/useAppColors';
import { IconButton } from '@/components/home/IconButton';
import { useQuotesStore } from '@/lib/store/useQuotesStore';
import { View, Text, Pressable, Share } from 'react-native';
import { useFavoritesStore } from '@/lib/store/useFavoritesStore';

type QuoteCardProps = {
  quote: Quote | null;
  onCopy?: () => void;
  onShare?: () => void;
  onRefresh?: () => void;
  onToggleFavorite?: () => void;
};

export const QuoteCard = ({
  quote,
  onCopy,
  onShare,
  onRefresh,
  onToggleFavorite,
}: QuoteCardProps) => {
  const { nextQuote } = useQuotesStore();
  const { THEMED_CONTENT } = useAppColors();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  if (!quote) {
    return null;
  }

  const liked = isFavorite(quote.text);

  const handleToggleFavorite = () => {
    if (liked) {
      removeFavorite(quote.text);
    } else {
      addFavorite(quote);
    }
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(quote.text);
    if (onCopy) {
      onCopy();
    }
  };

  const handleShare = async () => {
    await Share.share({
      message: `"${quote.text}" — ${quote.author}`,
    });
    if (onShare) {
      onShare();
    }
  };

  const handleRefresh = () => {
    nextQuote();
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <View className="bg-white rounded-3xl p-6 shadow-lg">
      <Text
        className="text-sm font-semibold mb-3"
        style={{ color: THEMED_CONTENT }}
      >
        {quote.category}
      </Text>

      <Text className="text-[22px] leading-8 font-medium text-gray-900 mb-4">
        “{quote.text}”
      </Text>

      {quote.author && (
        <Text className="text-sm text-gray-500 text-right mb-6">
          — {quote.author === 'Unknown' ? 'Anonymous' : quote.author}
        </Text>
      )}

      <View className="flex-row justify-between px-2">
        <IconButton onPress={handleToggleFavorite}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? '#FF4D4D' : '#333'}
          />
        </IconButton>

        <IconButton onPress={handleRefresh}>
          <Ionicons name="refresh" size={24} color="#333" />
        </IconButton>

        <IconButton onPress={handleShare}>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </IconButton>

        <IconButton onPress={handleCopy}>
          <Ionicons name="copy-outline" size={24} color="#333" />
        </IconButton>
      </View>
    </View>
  );
};
