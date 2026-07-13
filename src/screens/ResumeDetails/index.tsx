import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {RootStackParamList} from '../../navigation/types';
import {AppScreen, AppText} from '../../components/common';
import {PrimaryButton} from '../../components/buttons';
import TemplateResumeCard from '../../components/cards/TemplateResumeCard';
import {resumeService} from '../../services/resume';

import styles from './styles';

type ResumeDetailsRouteProp = RouteProp<RootStackParamList, 'ResumeDetails'>;

const ResumeDetails = () => {
  const route = useRoute<ResumeDetailsRouteProp>();
  const navigation = useNavigation<any>();
  const [deleting, setDeleting] = useState(false);
  const resume = route.params?.resume;

  const handleDelete = () => {
    if (!resume?._id) {
      return;
    }

    Alert.alert('Delete Resume', 'This resume will be removed permanently.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setDeleting(true);
            await resumeService.deleteResume(resume._id as string);
            navigation.navigate('Main', {
              screen: 'MyResumes',
            });
          } catch (error: any) {
            Alert.alert(
              'Error',
              error?.response?.data?.message || 'Failed to delete resume',
            );
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);
  };

  if (!resume) {
    return (
      <AppScreen>
        <View style={styles.empty}>
          <AppText>No Resume Found</AppText>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <AppText variant="h2" weight="700">
            Open Resume
          </AppText>
          <AppText color="#6B7280">
            Edit, switch template, preview, or export.
          </AppText>
        </View>

        <TemplateResumeCard
          resume={resume as any}
          templateId={resume.templateId || 1}
        />

        <View style={styles.actions}>
          <PrimaryButton
            title="EDIT RESUME"
            onPress={() =>
              navigation.navigate('CreateResume', {
                templateId: resume.templateId || 1,
                resume,
              })
            }
          />

          <View style={styles.gap} />

          <PrimaryButton
            title="CHANGE TEMPLATE"
            onPress={() =>
              navigation.navigate('CreateResume', {
                templateId: resume.templateId || 1,
                resume,
                focusTemplate: true,
              })
            }
          />

          <View style={styles.gap} />

          <PrimaryButton
            title="PREVIEW / DOWNLOAD"
            onPress={() =>
              navigation.navigate('PdfPreview', {
                resume,
              })
            }
          />

          <View style={styles.gap} />

          <PrimaryButton
            title="DELETE RESUME"
            onPress={handleDelete}
            loading={deleting}
            style={styles.deleteButton}
          />
        </View>
      </ScrollView>
    </AppScreen>
  );
};

export default ResumeDetails;
