import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const SingleSidedShadowBox = ({ children, style }: Props) => {
  return (
    <View style={[style, { paddingBottom: 1, overflow: 'hidden' }]}>
      {children}
    </View>
  );
};
