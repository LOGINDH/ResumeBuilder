import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

const TEMPLATE_IMAGES: {[key: number]: any} = {
  1: require('../../assets/images/templates/modern.png'),
  2: require('../../assets/images/templates/classic.png'),
  3: require('../../assets/images/templates/professional.png'),
};

import {AppScreen, AppText} from '../../components/common';
import {PrimaryButton} from '../../components/buttons';
import {SearchBar} from '../../components/inputs';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../../navigation/types';
import styles from './styles';

import {TEMPLATES} from '../../constants/templates';

type TemplatesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateResume'
>;
const Templates = () => {
  const navigation = useNavigation<TemplatesNavigationProp>();
  const [selected, setSelected] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = TEMPLATES.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <AppScreen>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>

        <AppText
          variant="h2"
          weight="700"
          style={styles.title}>
          Resume Templates
        </AppText>

        <AppText
          variant="body"
          style={styles.subtitle}>
          Select a premium template design
        </AppText>

        <SearchBar
          placeholder="Search templates (e.g., tech, classic, ats)..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{marginBottom: 20}}
        />

        {filteredTemplates.length > 0 ? (
          <View style={styles.gridContainer}>
            {filteredTemplates.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setSelected(item.id)}
                style={[
                  styles.gridCard,
                  selected === item.id && styles.selectedGridCard,
                ]}>

                <View style={styles.gridPreview}>
                  <Image source={TEMPLATE_IMAGES[item.id]} style={{width: '100%', height: '100%', resizeMode: 'cover'}} />
                </View>

                <View style={styles.gridInfo}>
                  <AppText
                    variant="title"
                    weight="700"
                    color="#111111"
                    style={{fontSize: 14}}
                    numberOfLines={1}>
                    {item.name}
                  </AppText>
                  <AppText
                    variant="caption"
                    color="#6b7280"
                    numberOfLines={1}
                    style={{marginTop: 2}}>
                    ATS Friendly
                  </AppText>
                </View>

              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{padding: 40, alignItems: 'center'}}>
            <AppText color="#6b7280" style={{textAlign: 'center'}}>
              No templates match your search query. Try searching for "tech", "ats", or "classic".
            </AppText>
          </View>
        )}

        {filteredTemplates.length > 0 && (
          <PrimaryButton
            title="USE TEMPLATE"
            style={styles.useButton}
            onPress={() => {
              navigation.navigate('CreateResume', {
                templateId: selected,
              });
            }}
          />
        )}

      </ScrollView>

    </AppScreen>
  );
};

export default Templates;