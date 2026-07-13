import React, {useMemo, useState} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {AppScreen, AppText} from '../../components/common';
import {Input} from '../../components/inputs';
import {PrimaryButton} from '../../components/buttons';
import TemplateResumeCard from '../../components/cards/TemplateResumeCard';

import {resumeService} from '../../services/resume';
import type {Resume, RootStackParamList} from '../../navigation/types';
import {TEMPLATES} from '../../constants/templates';

import styles from './styles';

type CreateResumeRouteProp = RouteProp<RootStackParamList, 'CreateResume'>;

const CreateResume = () => {
  const route = useRoute<CreateResumeRouteProp>();
  const navigation = useNavigation<any>();
  const resume = route.params?.resume;
  const [step, setStep] = useState(route.params?.focusTemplate ? 6 : 1);
  const [saving, setSaving] = useState(false);

  const [templateId, setTemplateId] = useState(
    resume?.templateId || route.params?.templateId || 1,
  );

  // Form fields
  const [name, setName] = useState(resume?.name || '');
  const [role, setRole] = useState(resume?.role || '');
  const [email, setEmail] = useState(resume?.email || '');
  const [phone, setPhone] = useState(resume?.phone || '');
  const [location, setLocation] = useState(resume?.location || '');
  const [summary, setSummary] = useState(resume?.summary || '');
  const [linkedin, setLinkedin] = useState(resume?.linkedin || '');
  const [portfolio, setPortfolio] = useState(resume?.portfolio || '');
  const [education, setEducation] = useState(resume?.education || '');
  const [experience, setExperience] = useState(resume?.experience || '');
  const [projects, setProjects] = useState(resume?.projects || '');
  const [certifications, setCertifications] = useState(resume?.certifications || '');
  const [languages, setLanguages] = useState(resume?.languages || '');
  const [skillsText, setSkillsText] = useState((resume?.skills || []).join(', '));

  const draftResume: Resume = useMemo(
    () => ({
      _id: resume?._id,
      name,
      role,
      email,
      phone,
      location,
      summary,
      linkedin,
      portfolio,
      education,
      experience,
      projects,
      certifications,
      languages,
      skills: skillsText
        .split(',')
        .map(skill => skill.trim())
        .filter(Boolean),
      templateId,
    }),
    [
      resume?._id,
      name,
      role,
      email,
      phone,
      location,
      summary,
      linkedin,
      portfolio,
      education,
      experience,
      projects,
      certifications,
      languages,
      skillsText,
      templateId,
    ],
  );

  const next = () => {
    if (step === 1 && (!name.trim() || !email.trim() || !phone.trim())) {
      Alert.alert('Validation', 'Please fill your name, email, and phone.');
      return;
    }

    if (step < 6) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const saveResume = async () => {
    try {
      setSaving(true);

      if (resume?._id) {
        await resumeService.updateResume(resume._id, draftResume);
      } else {
        await resumeService.saveResume(draftResume);
      }

      Alert.alert(
        'Success',
        resume?._id ? 'Resume updated successfully' : 'Resume saved successfully',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('Main', {
                screen: 'MyResumes',
              }),
          },
        ],
      );
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          'Failed to save resume',
      );
    } finally {
      setSaving(false);
    }
  };

  const renderTemplatePicker = () => (
    <View style={styles.templateGrid}>
      {TEMPLATES.map(template => (
        <TouchableOpacity
          key={template.id}
          activeOpacity={0.85}
          onPress={() => setTemplateId(template.id)}
          style={[
            styles.templateOption,
            templateId === template.id && styles.selectedTemplate,
          ]}>
          <AppText weight="700">{template.name}</AppText>
          <AppText variant="small">Template {template.id}</AppText>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <AppScreen>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.progressContainer}>
          <AppText variant="h2" weight="700">
            {resume?._id ? 'Edit Resume' : 'Create Resume'}
          </AppText>

          <AppText variant="body">
            Step {step} of 6
          </AppText>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                {width: `${(step / 6) * 100}%`},
              ]}
            />
          </View>
        </View>

        <View style={styles.section}>
          {step === 1 && (
            <>
              <AppText variant="title" weight="700" style={styles.sectionTitle}>
                Contact Information
              </AppText>
              <Input placeholder="Full Name *" value={name} onChangeText={setName} />
              <Input placeholder="Professional Title (e.g. Software Engineer)" value={role} onChangeText={setRole} multiline />
              <Input
                placeholder="Email *"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                placeholder="Phone Number *"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Input placeholder="Location (e.g. San Francisco, CA)" value={location} onChangeText={setLocation} multiline />
            </>
          )}

          {step === 2 && (
            <>
              <AppText variant="title" weight="700" style={styles.sectionTitle}>
                Profile Summary & Links
              </AppText>
              <Input
                placeholder="Brief professional summary about yourself"
                value={summary}
                onChangeText={setSummary}
                multiline
              />
              <Input placeholder="LinkedIn URL" value={linkedin} onChangeText={setLinkedin} autoCapitalize="none" />
              <Input placeholder="Portfolio / Website URL" value={portfolio} onChangeText={setPortfolio} autoCapitalize="none" />
            </>
          )}

          {step === 3 && (
            <>
              <AppText variant="title" weight="700" style={styles.sectionTitle}>
                Work Experience
              </AppText>
              <Input
                placeholder="Company, role, years, achievements..."
                value={experience}
                onChangeText={setExperience}
                multiline
              />
            </>
          )}

          {step === 4 && (
            <>
              <AppText variant="title" weight="700" style={styles.sectionTitle}>
                Education & Projects
              </AppText>
              <Input
                placeholder="Degree, college, graduation year, score..."
                value={education}
                onChangeText={setEducation}
                multiline
              />
              <View style={{height: 15}} />
              <Input
                placeholder="Key projects, roles, technologies used..."
                value={projects}
                onChangeText={setProjects}
                multiline
              />
            </>
          )}

          {step === 5 && (
            <>
              <AppText variant="title" weight="700" style={styles.sectionTitle}>
                Skills & More Details
              </AppText>
              <Input
                placeholder="Skills separated by commas (e.g. React, Node, Python)"
                value={skillsText}
                onChangeText={setSkillsText}
                multiline
              />
              <View style={{height: 15}} />
              <Input
                placeholder="Certifications & Awards (e.g. AWS Certified Developer)"
                value={certifications}
                onChangeText={setCertifications}
                multiline
              />
              <View style={{height: 15}} />
              <Input
                placeholder="Languages known (e.g. English, Spanish)"
                value={languages}
                onChangeText={setLanguages}
                multiline
              />
            </>
          )}

          {step === 6 && (
            <>
              <AppText variant="title" weight="700" style={styles.sectionTitle}>
                Preview & Choose Template
              </AppText>
              {renderTemplatePicker()}
              <View style={{height: 20}} />
              <TemplateResumeCard resume={draftResume as any} templateId={templateId} />
            </>
          )}
        </View>

        <View style={styles.buttonRow}>
          <PrimaryButton
            title="BACK"
            style={styles.backButton}
            onPress={back}
          />

          {step < 6 ? (
            <PrimaryButton
              title="NEXT"
              style={styles.nextButton}
              onPress={next}
            />
          ) : (
            <PrimaryButton
              title={resume?._id ? 'UPDATE RESUME' : 'SAVE RESUME'}
              style={styles.nextButton}
              onPress={saveResume}
              loading={saving}
            />
          )}
        </View>
      </ScrollView>
    </AppScreen>
  );
};

export default CreateResume;
