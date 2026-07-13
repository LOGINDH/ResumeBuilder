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
import {Theme} from '../../theme';

import {TEMPLATES, Template} from '../../constants/templates';

type TemplatesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateResume'
>;

const MiniTemplatePreview = ({id}: {id: number}) => {
  if (id === 1) {
    // MODERN
    return (
      <View style={{padding: 15, width: '100%', height: '100%', backgroundColor: '#FFFFFF', justifyContent: 'flex-start'}}>
        {/* Header */}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#E5E7EB', paddingBottom: 6, marginBottom: 8}}>
          <View style={{width: '50%', gap: 3}}>
            <View style={{height: 10, width: '80%', backgroundColor: '#111827', borderRadius: 2}} />
            <View style={{height: 6, width: '60%', backgroundColor: '#9CA3AF', borderRadius: 1}} />
          </View>
          <View style={{width: '35%', gap: 3, alignItems: 'flex-end'}}>
            <View style={{height: 5, width: '100%', backgroundColor: '#D1D5DB', borderRadius: 1}} />
            <View style={{height: 5, width: '90%', backgroundColor: '#D1D5DB', borderRadius: 1}} />
            <View style={{height: 5, width: '80%', backgroundColor: '#D1D5DB', borderRadius: 1}} />
          </View>
        </View>
        {/* Summary */}
        <View style={{gap: 3, marginBottom: 8}}>
          <View style={{height: 6, width: '25%', backgroundColor: '#111827', borderRadius: 1}} />
          <View style={{height: 5, width: '100%', backgroundColor: '#F3F4F6', borderRadius: 1}} />
          <View style={{height: 5, width: '95%', backgroundColor: '#F3F4F6', borderRadius: 1}} />
        </View>
        {/* Experience */}
        <View style={{gap: 3}}>
          <View style={{height: 6, width: '35%', backgroundColor: '#111827', borderRadius: 1}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{height: 5, width: '20%', backgroundColor: '#9CA3AF', borderRadius: 1}} />
            <View style={{height: 5, width: '70%', backgroundColor: '#D1D5DB', borderRadius: 1}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{height: 5, width: '20%', backgroundColor: '#E5E7EB', borderRadius: 1}} />
            <View style={{height: 5, width: '65%', backgroundColor: '#F3F4F6', borderRadius: 1}} />
          </View>
        </View>
      </View>
    );
  }

  if (id === 2) {
    // CLASSIC
    return (
      <View style={{padding: 15, width: '100%', height: '100%', backgroundColor: '#FFFFFF', justifyContent: 'flex-start', alignItems: 'center'}}>
        {/* Centered Name */}
        <View style={{height: 10, width: '50%', backgroundColor: '#1a253c', borderRadius: 2, marginBottom: 3}} />
        <View style={{height: 6, width: '30%', backgroundColor: '#6B7280', borderRadius: 1, marginBottom: 6}} />
        {/* Contact Bar */}
        <View style={{borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#1a253c', width: '90%', paddingVertical: 3, flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: 10}}>
          <View style={{height: 4, width: '20%', backgroundColor: '#D1D5DB', borderRadius: 1}} />
          <View style={{height: 4, width: '20%', backgroundColor: '#D1D5DB', borderRadius: 1}} />
          <View style={{height: 4, width: '20%', backgroundColor: '#D1D5DB', borderRadius: 1}} />
        </View>
        {/* Sections */}
        <View style={{width: '100%', gap: 3, marginBottom: 8}}>
          <View style={{height: 6, width: '30%', backgroundColor: '#111827', borderBottomWidth: 0.5, borderBottomColor: '#D1D5DB', borderRadius: 1}} />
          <View style={{height: 5, width: '100%', backgroundColor: '#F3F4F6', borderRadius: 1}} />
          <View style={{height: 5, width: '90%', backgroundColor: '#F3F4F6', borderRadius: 1}} />
        </View>
        {/* Skills grid */}
        <View style={{width: '100%', gap: 3}}>
          <View style={{height: 6, width: '20%', backgroundColor: '#111827', borderBottomWidth: 0.5, borderBottomColor: '#D1D5DB', borderRadius: 1}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
            <View style={{height: 4, width: '30%', backgroundColor: '#E5E7EB', borderRadius: 1}} />
            <View style={{height: 4, width: '30%', backgroundColor: '#E5E7EB', borderRadius: 1}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
            <View style={{height: 4, width: '30%', backgroundColor: '#E5E7EB', borderRadius: 1}} />
            <View style={{height: 4, width: '30%', backgroundColor: '#E5E7EB', borderRadius: 1}} />
          </View>
        </View>
      </View>
    );
  }

  // PROFESSIONAL
  return (
    <View style={{padding: 15, width: '100%', height: '100%', backgroundColor: '#FFFFFF', justifyContent: 'flex-start'}}>
      {/* Top Banner accent */}
      <View style={{height: 3, width: '100%', backgroundColor: '#C6A969', marginBottom: 8}} />
      {/* Header */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
        <View style={{width: '55%', gap: 3}}>
          <View style={{height: 12, width: '90%', backgroundColor: '#000000', borderRadius: 2}} />
          <View style={{height: 6, width: '50%', backgroundColor: '#6B7280', borderRadius: 1}} />
        </View>
        <View style={{width: '40%', gap: 3, alignItems: 'flex-end'}}>
          <View style={{height: 5, width: '90%', backgroundColor: '#D1D5DB', borderRadius: 1}} />
          <View style={{height: 5, width: '80%', backgroundColor: '#D1D5DB', borderRadius: 1}} />
        </View>
      </View>
      {/* Sections with divider decoration */}
      <View style={{width: '100%', marginBottom: 8}}>
        <View style={{height: 1, backgroundColor: '#000000', width: '100%', position: 'relative', marginBottom: 6}}>
          <View style={{height: 3, backgroundColor: '#000000', width: 40, position: 'absolute', top: -1}} />
        </View>
        <View style={{height: 6, width: '40%', backgroundColor: '#000000', borderRadius: 1, marginBottom: 4}} />
        <View style={{height: 5, width: '100%', backgroundColor: '#F3F4F6', borderRadius: 1}} />
      </View>
      <View style={{width: '100%'}}>
        <View style={{height: 1, backgroundColor: '#000000', width: '100%', position: 'relative', marginBottom: 6}}>
          <View style={{height: 3, backgroundColor: '#000000', width: 40, position: 'absolute', top: -1}} />
        </View>
        <View style={{height: 6, width: '30%', backgroundColor: '#000000', borderRadius: 1, marginBottom: 4}} />
        <View style={{height: 5, width: '95%', backgroundColor: '#F3F4F6', borderRadius: 1}} />
      </View>
    </View>
  );
};

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