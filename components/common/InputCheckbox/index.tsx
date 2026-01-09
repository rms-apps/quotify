import { useAppColors } from '@/lib/hooks/useAppColors';
import { Pressable, Text, View } from 'react-native';

type Option = {
  value: string;
  label: string;
};

export type InputCheckboxProps = {
  value: string;
  label1: string;
  label2: string;
  options: Option[];
  onChange: (value: string) => void;
};

export const InputCheckbox = ({
  value,
  label1,
  label2,
  options,
  onChange,
}: InputCheckboxProps) => {
  const { THEMED_CONTENT } = useAppColors();

  return (
    <View className="flex flex-col gap-2">
      <View className="bg-white py-4 pb-2 rounded-t-2xl shadow-md relative">
        <View
          className="absolute bottom-[-8px] left-0 z-10"
          style={{
            width: 0,
            height: 0,
            borderTopWidth: 8,
            borderBottomWidth: 8,
            borderLeftWidth: 8,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: '#FFFFFF',
          }}
        />

        <View className="flex flex-row px-4 items-center">
          <Text className="flex-1 text-gray-500 text-sm">{label1}</Text>
          <Text className="flex-1 text-gray-500 text-sm">{label2}</Text>
          <View className="w-5" />
        </View>

        <View
          className="absolute bottom-[-8px] right-0 z-10"
          style={{
            width: 0,
            height: 0,
            borderTopWidth: 8,
            borderBottomWidth: 8,
            borderRightWidth: 8,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRightColor: '#FFFFFF',
          }}
        />
      </View>

      <View className="flex flex-col bg-white py-4 px-4 rounded-2xl shadow-md gap-5">
        {options.map((option, key) => (
          <Pressable
            key={`option-${key}`}
            className="flex flex-row items-center"
            onPress={() => onChange(option.value)}
          >
            <Text className="flex-1">{option.value}</Text>

            <Text className="flex-1 text-gray-500 text-sm">{option.label}</Text>

            <View
              className={`w-5 h-5 rounded-full border-2 items-center justify-center`}
              style={{
                borderColor:
                  option.value === value ? THEMED_CONTENT : THEMED_CONTENT,
              }}
            >
              {option.value === value && (
                <View
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: THEMED_CONTENT }}
                />
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
