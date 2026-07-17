import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {generatePDF} from 'react-native-html-to-pdf';

import {AppScreen, AppText} from '../../components/common';
import {PrimaryButton} from '../../components/buttons';
import TemplateResumeCard from '../../components/cards/TemplateResumeCard';
import type {RootStackParamList} from '../../navigation/types';
import {Theme} from '../../theme';
import {generateResumeHtml} from '../../utils/pdfTemplate';
import {resumeService} from '../../services/resume';
import {downloadPdf, sharePdf} from '../../utils/nativeFile';
import {addDownloadHistory} from '../../services/auth';
import {TEMPLATES} from '../../constants/templates';


type PdfPreviewRouteProp = RouteProp<RootStackParamList, 'PdfPreview'>;

const PdfPreview = () => {
  const route = useRoute<PdfPreviewRouteProp>();
  const navigation = useNavigation<any>();
  const resume = route.params?.resume;
  
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const generateResumePdfFile = async (): Promise<{ filePath: string; fileName: string } | null> => {
    if (!resume) return null;
    
    const htmlContent = generateResumeHtml(resume);
    const fileName = `${(resume.name || 'Resume').replace(/\s+/g, '_')}_${Date.now()}`;
    const options = {
      html: htmlContent,
      fileName: fileName,
      directory: 'Downloads',
    };

    const file = await generatePDF(options);
    if (file && file.filePath) {
      return { filePath: file.filePath, fileName };
    }
    throw new Error('Failed to generate PDF file path.');
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const fileData = await generateResumePdfFile();
      if (fileData) {
        await downloadPdf(fileData.filePath, fileData.fileName);
        
        // Log to backend download history for the profile stats
        try {
          const tempId = resume.templateId || 1;
          const matchedTemp = TEMPLATES.find(t => t.id === tempId);
          await addDownloadHistory({
            resumeId: resume._id || `temp_${Date.now()}`,
            title: resume.name || 'Untitled Resume',
            templateId: tempId,
            templateName: matchedTemp ? matchedTemp.name : 'Modern',
          });
        } catch (logError) {
          console.log('Failed to log download on backend:', logError);
        }

        Alert.alert('Success', 'PDF downloaded successfully into your Downloads folder.');
      }
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to download PDF.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    try {
      setSharing(true);
      const fileData = await generateResumePdfFile();
      if (fileData) {
        await sharePdf(fileData.filePath, resume.name || 'Resume');
      }
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to share PDF.');
    } finally {
      setSharing(false);
    }
  };

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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AppText>No resume available.</AppText>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <ScrollView
        style={{flex: 1, paddingTop: Theme.spacing.lg}}
        showsVerticalScrollIndicator={false}>
        <AppText variant="h2" weight="700" style={{marginBottom: 6}}>
          Preview Resume
        </AppText>

        <AppText color={Theme.colors.textSecondary} style={{marginBottom: 20}}>
          Check your details and export to PDF.
        </AppText>

        <TemplateResumeCard
          resume={resume as any}
          templateId={resume.templateId || 1}
        />

        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 12}}>
          <PrimaryButton
            title="DOWNLOAD PDF"
            onPress={handleDownload}
            loading={downloading}
            style={{flex: 1}}
          />
          
          <PrimaryButton
            title="SHARE PDF"
            onPress={handleShare}
            loading={sharing}
            style={{flex: 1}}
          />
        </View>

        <View style={{height: 12}} />

        <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 12}}>
          <PrimaryButton
            title="EDIT DETAILS"
            onPress={() =>
              navigation.navigate('CreateResume', {
                templateId: resume.templateId || 1,
                resume,
              })
            }
            style={{flex: 1}}
          />
          
          <PrimaryButton
            title="CHANGE TEMPLATE"
            onPress={() =>
              navigation.navigate('CreateResume', {
                templateId: resume.templateId || 1,
                resume,
                focusTemplate: true,
              })
            }
            style={{flex: 1}}
          />
        </View>

        <View style={{height: 12}} />

        <PrimaryButton
          title="DELETE RESUME"
          onPress={handleDelete}
          loading={deleting}
          style={{backgroundColor: Theme.colors.error, marginBottom: 40}}
        />
      </ScrollView>
    </AppScreen>
  );
};

export default PdfPreview;
