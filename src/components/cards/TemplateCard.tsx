import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';

import {AppText} from '../common';
import {Theme} from '../../theme';

interface Props {
  title: string;
  image: ImageSourcePropType;
  onPress?: () => void;
}

const TemplateCard = ({
  title,
  image,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}>

      <Image
        source={image}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.footer}>
        <AppText
          variant="title"
          weight="700">
          {title}
        </AppText>

        <AppText
          variant="small"
          color={Theme.colors.textSecondary}>
          ATS Friendly
        </AppText>
      </View>

    </TouchableOpacity>
  );
};

export default TemplateCard;

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: Theme.radius.xl,
    overflow: 'hidden',
    backgroundColor: Theme.colors.surface,
    marginRight: Theme.spacing.md,
    ...Theme.shadows.medium,
  },

  image: {
    width: '100%',
    height: 230,
  },

  footer: {
    padding: 12,
  },
});