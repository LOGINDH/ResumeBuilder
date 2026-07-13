import React from 'react';
import {
  Text,
  TextProps,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';

import { Theme } from '../../theme';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'title'
  | 'body'
  | 'small'
  | 'caption';

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  weight?: TextStyle['fontWeight'];
  align?: TextStyle['textAlign'];
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const fontSizeMap = {
  h1: Theme.typography.h1,
  h2: Theme.typography.h2,
  h3: Theme.typography.h3,
  title: Theme.typography.title,
  body: Theme.typography.body,
  small: Theme.typography.small,
  caption: Theme.typography.caption,
};

const AppText = ({
  variant = 'body',
  color = Theme.colors.text,
  weight = '400',
  align = 'left',
  style,
  children,
  ...props
}: AppTextProps) => {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: fontSizeMap[variant],
          color,
          fontWeight: weight,
          textAlign: align,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
});