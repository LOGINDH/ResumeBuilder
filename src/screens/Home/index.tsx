import React, {useCallback, useState} from 'react';
import {ScrollView} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppScreen, AppText} from '../../components/common';
import {HomeHeader} from '../../components/headers';

import {
  HeroCard,
  StatsCard,
  ResumeCard,
  TemplateCard,
} from '../../components/cards';

import type {Resume, RootStackParamList} from '../../navigation/types';
import {resumeService} from '../../services/resume';
import {getMe} from '../../services/auth';

import styles from './styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [userName, setUserName] = useState('');

  useFocusEffect(
    useCallback(() => {
      resumeService
        .getMyResumes()
        .then(data => setResumes(data || []))
        .catch(() => setResumes([]));

      getMe()
        .then(response => {
          if (response?.user?.name) {
            setUserName(response.user.name);
          }
        })
        .catch(() => setUserName('LOGINDH'));
    }, []),
  );

  const recentResumes = resumes.slice(0, 2);

  return (
    <AppScreen>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>

        <HomeHeader name={userName} />

        <HeroCard />

        <AppText
          variant="title"
          weight="700"
          style={styles.sectionTitle}>
          Premium Templates
        </AppText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.templateContainer}>

          <TemplateCard
            title="Modern"
            image={require('../../assets/images/templates/modern.jpg')}
            onPress={() =>
              navigation.navigate('TemplatePreview', {
                templateId: 1,
              })
            }
          />

          <TemplateCard
            title="Classic"
            image={require('../../assets/images/templates/classic.jpg')}
            onPress={() =>
              navigation.navigate('TemplatePreview', {
                templateId: 2,
              })
            }
          />

          <TemplateCard
            title="Professional"
            image={require('../../assets/images/templates/professional.jpg')}
            onPress={() =>
              navigation.navigate('TemplatePreview', {
                templateId: 3,
              })
            }
          />

        </ScrollView>

        <AppText
          variant="title"
          weight="700"
          style={styles.sectionTitle}>
          Recent Resumes
        </AppText>

        {recentResumes.length > 0 ? (
          recentResumes.map(resume => (
            <ResumeCard
              key={resume._id}
              title={resume.name || 'Untitled Resume'}
              updated={resume.updatedAt ? 'Updated recently' : 'Saved resume'}
              onPress={() =>
                navigation.navigate('PdfPreview', {
                  resume,
                })
              }
            />
          ))
        ) : (
          <ResumeCard
            title="No resumes yet"
            updated="Choose a template to create your first resume"
            onPress={() => navigation.navigate('TemplatePreview', {templateId: 1})}
          />
        )}

        <AppText
          variant="title"
          weight="700"
          style={styles.sectionTitle}>
          Statistics
        </AppText>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statsContainer}>

          <StatsCard number={`${resumes.length}`} title="Resumes" />
          <StatsCard number="03" title="Templates" />
          <StatsCard number={`${recentResumes.length}`} title="Recent" />

        </ScrollView>

      </ScrollView>
    </AppScreen>
  );
};

export default Home;
