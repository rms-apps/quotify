import { View } from 'react-native';
import { ThemedText } from '@rms-apps/ui-themed-text';
import { ModalWrapper } from '@rms-apps/ui-modal-wrapper';
import { ThemedDivider } from '@rms-apps/ui-themed-divider';

export type Section = {
  title: string;
  content: string;
};

type InfoModalProps = {
  title: string;
  visible: boolean;
  sections: Section[];
  onClose: () => void;
};

export const InfoModal = ({
  title,
  visible,
  sections,
  onClose,
}: InfoModalProps) => {
  return (
    <ModalWrapper
      isVisible={visible}
      title={title}
      variant="bottomSheet"
      withTouchableBackdrop
      bottomOffset={0}
      onRequestClose={onClose}
    >
      {sections.map((section, index) => (
        <View key={`section-${section.title}-${index}`} className="gap-4">
          <ThemedText size="b1" weight="semibold" align="left">
            {index + 1}. {section.title}
          </ThemedText>
          <ThemedText align="left">{section.content}</ThemedText>
          {index < sections.length - 1 && (
            <View className="mb-4">
              <ThemedDivider />
            </View>
          )}
        </View>
      ))}
    </ModalWrapper>
  );
};
