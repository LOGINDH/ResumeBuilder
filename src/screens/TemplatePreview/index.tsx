import React from 'react';
import {Image, ScrollView} from 'react-native';
import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppScreen, AppText} from '../../components/common';
import {PrimaryButton} from '../../components/buttons';

import {RootStackParamList} from '../../navigation/types';

import styles from './styles';

type RouteProps = RouteProp<RootStackParamList, 'TemplatePreview'>;
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const TemplatePreview = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const {templateId} = route.params;

  const images: Record<number, any> = {
    1: require('../../assets/images/templates/modern.jpg'),
    2: require('../../assets/images/templates/classic.jpg'),
    3: require('../../assets/images/templates/professional.jpg'),
  };

  const names: Record<number, string> = {
    1: 'Modern',
    2: 'Classic',
    3: 'Professional',
  };

  return (
    <AppScreen>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <Image
          source={images[templateId]}
          style={styles.image}
          resizeMode="contain"
        />

        <AppText variant="h2" weight="700" style={styles.title}>
          {names[templateId]} Template
        </AppText>

        <AppText style={styles.description}>
          ATS Friendly - Premium Design - Professional Layout
        </AppText>

        <PrimaryButton
          title="USE THIS TEMPLATE"
          onPress={() =>
            navigation.navigate('CreateResume', {
              templateId,
            })
          }
        />
      </ScrollView>
    </AppScreen>
  );
};

export default TemplatePreview;
