import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AppText} from '../common';
import {Theme} from '../../theme';
import type {Resume} from '../../navigation/types';

interface Props {
  resume: Resume;
  onPress?: () => void;
  templateId?: number;
}

interface ParsedItem {
  left: string;
  rightHeader: string;
  rightBody: string;
}

// Parses multiline strings (like experience or education) into left-column (date/place) and right-column (header/body) data
const parseMultilineSection = (text?: string): ParsedItem[] => {
  if (!text) return [];
  
  const blocks = text.split(/\n\s*\n/);
  
  return blocks.map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return { left: '', rightHeader: '', rightBody: '' };
    
    const dateRegex = /(\b\d{4}\s*-\s*(?:\d{4}|NOW|Present|Current)?\b)|(\b\d{4}\b)/i;
    
    let left = '';
    let rightHeader = '';
    let rightBody = '';
    
    let dateLineIndex = -1;
    let matchedDate = '';
    
    for (let i = 0; i < Math.min(lines.length, 3); i++) {
      const match = lines[i].match(dateRegex);
      if (match) {
        matchedDate = match[0];
        dateLineIndex = i;
        break;
      }
    }
    
    if (dateLineIndex === 0) {
      left = matchedDate;
      const remaining = lines[0].replace(matchedDate, '').trim();
      const cleanedRemaining = remaining.replace(/^[,\s\-\|()]+|[,\s\-\|()]+$/g, '').trim();
      
      if (cleanedRemaining.length > 2) {
        rightHeader = cleanedRemaining;
        rightBody = lines.slice(1).join('\n');
      } else {
        rightHeader = lines[1] || '';
        rightBody = lines.slice(2).join('\n');
      }
    } else if (dateLineIndex > 0) {
      left = matchedDate;
      const remainingLines = lines.filter((_, idx) => idx !== dateLineIndex);
      rightHeader = remainingLines[0] || '';
      rightBody = remainingLines.slice(1).join('\n');
    } else {
      rightHeader = lines[0];
      rightBody = lines.slice(1).join('\n');
    }
    
    rightHeader = rightHeader
      .replace(/\(\s*\)/g, '')
      .replace(/^[,\s\-\|]+|[,\s\-\|]+$/g, '')
      .trim();
      
    return { left, rightHeader, rightBody };
  });
};

const TemplateResumeCard = ({resume, onPress, templateId = 1}: Props) => {
  const isShowcase = !resume.name && !resume.email && !resume.phone;

  const name = resume.name || (isShowcase ? 'YOUR NAME' : '');
  const role = resume.role || (isShowcase ? 'Job Title/ Target Role' : '');
  const email = resume.email || (isShowcase ? 'email@example.com' : '');
  const phone = resume.phone || (isShowcase ? 'Phone' : '');
  const location = resume.location || (isShowcase ? 'Location' : '');
  const linkedin = resume.linkedin;
  const portfolio = resume.portfolio;
  const summary = resume.summary || (isShowcase ? 'Short 2-3 lines summary' : '');
  const education = resume.education || (isShowcase ? 'School Name\nDuration\nDegree and achievements' : '');
  const experience = resume.experience || (isShowcase ? 'Company Name\nJob Title\nDuration\nAdd description of the job and achievements.' : '');
  const projects = resume.projects;
  const certifications = resume.certifications;
  const languages = resume.languages || (isShowcase ? 'English, Spanish' : '');
  const skills = resume.skills?.length ? resume.skills : (isShowcase ? ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'] : []);

  const TwoColRow = ({left, rightHeader, rightBody}: ParsedItem) => (
    <View style={styles.twoColRow}>
      <View style={styles.leftCol}>
        <AppText weight="700" style={styles.dateText}>
          {left || 'Duration'}
        </AppText>
      </View>
      <View style={styles.rightCol}>
        <AppText weight="700" style={styles.headerBold}>
          {rightHeader}
        </AppText>
        {rightBody ? (
          <AppText style={styles.bodyText}>
            {rightBody}
          </AppText>
        ) : null}
      </View>
    </View>
  );

  // ==========================================
  // MODERN TEMPLATE (Default / 1)
  // ==========================================
  const renderModernTemplate = () => {
    const parsedExperience = parseMultilineSection(experience);
    const parsedEducation = parseMultilineSection(education);
    const mid = Math.ceil(skills.length / 2);
    const leftSkills = skills.slice(0, mid);
    const rightSkills = skills.slice(mid);

    return (
      <View style={styles.modernContainer}>
        <View style={styles.modernHeaderWrap}>
          <View style={styles.modernHeaderLeft}>
            <AppText weight="700" style={styles.modernName}>
              {name}
            </AppText>
            <AppText style={styles.modernRole}>
              {role}
            </AppText>
          </View>
          <View style={styles.modernHeaderRight}>
            {phone ? <AppText style={styles.modernContactText}>Phone: {phone}</AppText> : null}
            {email ? <AppText style={styles.modernContactText}>Email: {email}</AppText> : null}
            {location ? <AppText style={styles.modernContactText}>Loc: {location}</AppText> : null}
            {linkedin ? <AppText style={styles.modernContactText}>LinkedIn: {linkedin}</AppText> : null}
            {portfolio ? <AppText style={styles.modernContactText}>Web: {portfolio}</AppText> : null}
          </View>
        </View>

        {summary ? (
          <View style={styles.modernSection}>
            <AppText weight="700" style={styles.modernTitle}>Profile</AppText>
            <AppText style={styles.bodyText}>{summary}</AppText>
          </View>
        ) : null}

        {experience ? (
          <View style={styles.modernSection}>
            <AppText weight="700" style={styles.modernTitle}>Work Experience</AppText>
            {parsedExperience.map((item, idx) => (
              <TwoColRow key={idx} {...item} />
            ))}
          </View>
        ) : null}

        {education ? (
          <View style={styles.modernSection}>
            <AppText weight="700" style={styles.modernTitle}>Education</AppText>
            {parsedEducation.map((item, idx) => (
              <TwoColRow key={idx} {...item} />
            ))}
          </View>
        ) : null}

        {projects ? (
          <View style={styles.modernSection}>
            <AppText weight="700" style={styles.modernTitle}>Projects</AppText>
            <AppText style={styles.bodyText}>{projects}</AppText>
          </View>
        ) : null}

        {languages ? (
          <View style={styles.modernSection}>
            <AppText weight="700" style={styles.modernTitle}>Languages</AppText>
            <AppText style={styles.bodyText}>{languages}</AppText>
          </View>
        ) : null}

        <View style={styles.modernSection}>
          <View style={styles.twoColRow}>
            <View style={styles.leftCol}>
              <AppText weight="700" style={styles.modernSubTitle}>Skill</AppText>
              {leftSkills.map((s, idx) => (
                <AppText key={idx} style={styles.modernSkillText}>• {s}</AppText>
              ))}
            </View>
            <View style={styles.rightCol}>
              <AppText weight="700" style={styles.modernSubTitle}>Tools</AppText>
              {rightSkills.map((s, idx) => (
                <AppText key={idx} style={styles.modernSkillText}>• {s}</AppText>
              ))}
            </View>
          </View>
        </View>

        {certifications ? (
          <View style={styles.modernSection}>
            <AppText weight="700" style={styles.modernTitle}>Interests (Optional)</AppText>
            <AppText style={styles.bodyText}>{certifications}</AppText>
          </View>
        ) : null}
      </View>
    );
  };

  // ==========================================
  // CLASSIC TEMPLATE
  // ==========================================
  const renderClassicTemplate = () => {
    const parsedExperience = parseMultilineSection(experience);
    const parsedEducation = parseMultilineSection(education);

    const contactParts = [
      phone ? `Phone: ${phone}` : '',
      location ? `Loc: ${location}` : '',
      email ? `Email: ${email}` : '',
      linkedin ? `LinkedIn: ${linkedin}` : '',
      portfolio ? `Web: ${portfolio}` : ''
    ].filter(Boolean);

    return (
      <View style={styles.classicContainer}>
        <View style={styles.classicHeader}>
          <AppText weight="700" style={styles.classicName}>
            {name}
          </AppText>
          <AppText style={styles.classicRole}>
            {role.toUpperCase()}
          </AppText>
          
          <View style={styles.classicContactBar}>
            <AppText style={styles.classicContactText}>
              {contactParts.join('   •   ')}
            </AppText>
          </View>
        </View>

        {summary ? (
          <View style={styles.classicSection}>
            <AppText weight="700" style={styles.classicTitle}>About Me</AppText>
            <AppText style={styles.bodyText}>{summary}</AppText>
          </View>
        ) : null}

        {experience ? (
          <View style={styles.classicSection}>
            <AppText weight="700" style={styles.classicTitle}>Experience</AppText>
            {parsedExperience.map((item, idx) => (
              <TwoColRow key={idx} {...item} />
            ))}
          </View>
        ) : null}

        {education ? (
          <View style={styles.classicSection}>
            <AppText weight="700" style={styles.classicTitle}>Education</AppText>
            {parsedEducation.map((item, idx) => (
              <TwoColRow key={idx} {...item} />
            ))}
          </View>
        ) : null}

        {projects ? (
          <View style={styles.classicSection}>
            <AppText weight="700" style={styles.classicTitle}>Projects</AppText>
            <AppText style={styles.bodyText}>{projects}</AppText>
          </View>
        ) : null}

        {skills.length > 0 ? (
          <View style={styles.classicSection}>
            <AppText weight="700" style={styles.classicTitle}>Skills</AppText>
            <View style={styles.classicSkillsGrid}>
              {skills.map((s, idx) => (
                <View key={idx} style={styles.classicSkillItem}>
                  <AppText style={styles.classicSkillText}>• {s}</AppText>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {certifications || languages ? (
          <View style={styles.classicSection}>
            <AppText weight="700" style={styles.classicTitle}>Certifications & Languages</AppText>
            <View style={styles.twoColRow}>
              <View style={styles.leftCol}>
                {languages ? (
                  <View>
                    <AppText weight="700" style={styles.headerBold}>Languages</AppText>
                    <AppText style={styles.bodyText}>{languages}</AppText>
                  </View>
                ) : null}
              </View>
              <View style={styles.rightCol}>
                {certifications ? (
                  <View>
                    <AppText weight="700" style={styles.headerBold}>Certifications</AppText>
                    <AppText style={styles.bodyText}>{certifications}</AppText>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  // ==========================================
  // PROFESSIONAL TEMPLATE
  // ==========================================
  const renderProfessionalTemplate = () => {
    const parsedExperience = parseMultilineSection(experience);
    const parsedEducation = parseMultilineSection(education);

    const SectionTitle = ({title}: {title: string}) => (
      <View style={styles.profTitleContainer}>
        <View style={styles.profTitleLine} />
        <View style={styles.profTitleAccent} />
        <AppText weight="700" style={styles.profTitleText}>
          {title}
        </AppText>
      </View>
    );

    return (
      <View style={styles.profContainer}>
        <View style={styles.profHeaderWrap}>
          <View style={styles.profHeaderLeft}>
            <AppText weight="700" style={styles.profName}>
              {name}
            </AppText>
            <AppText style={styles.profRole}>
              {role.toUpperCase()}
            </AppText>
          </View>
          <View style={styles.profHeaderRight}>
            {phone ? <AppText style={styles.profContactText}>Phone: {phone}</AppText> : null}
            {email ? <AppText style={styles.profContactText}>Email: {email}</AppText> : null}
            {location ? <AppText style={styles.profContactText}>Loc: {location}</AppText> : null}
            {linkedin ? <AppText style={styles.profContactText}>LinkedIn: {linkedin}</AppText> : null}
            {portfolio ? <AppText style={styles.profContactText}>Web: {portfolio}</AppText> : null}
          </View>
        </View>

        {summary ? (
          <View style={styles.profSection}>
            <SectionTitle title="More About Me" />
            <AppText style={styles.bodyText}>{summary}</AppText>
          </View>
        ) : null}

        {experience ? (
          <View style={styles.profSection}>
            <SectionTitle title="Experience" />
            {parsedExperience.map((item, idx) => (
              <TwoColRow key={idx} {...item} />
            ))}
          </View>
        ) : null}

        {education ? (
          <View style={styles.profSection}>
            <SectionTitle title="Education" />
            {parsedEducation.map((item, idx) => (
              <TwoColRow key={idx} {...item} />
            ))}
          </View>
        ) : null}

        {projects ? (
          <View style={styles.profSection}>
            <SectionTitle title="Projects" />
            <AppText style={styles.bodyText}>{projects}</AppText>
          </View>
        ) : null}

        {skills.length > 0 ? (
          <View style={styles.profSection}>
            <SectionTitle title="Skills & Expertise" />
            <AppText style={styles.profSkillsLine}>
              {skills.join('   •   ')}
            </AppText>
          </View>
        ) : null}

        {certifications || languages ? (
          <View style={styles.profSection}>
            <SectionTitle title="Additional Information" />
            <View style={styles.twoColRow}>
              <View style={styles.leftCol}>
                {languages ? (
                  <View>
                    <AppText weight="700" style={styles.headerBold}>Languages</AppText>
                    <AppText style={styles.bodyText}>{languages}</AppText>
                  </View>
                ) : null}
              </View>
              <View style={styles.rightCol}>
                {certifications ? (
                  <View>
                    <AppText weight="700" style={styles.headerBold}>Certifications</AppText>
                    <AppText style={styles.bodyText}>{certifications}</AppText>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const getTemplate = () => {
    switch (templateId) {
      case 2:
        return renderClassicTemplate();
      case 3:
        return renderProfessionalTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.cardContainer}>
      {onPress ? (
        <View style={styles.openBadge}>
          <MaterialCommunityIcons
            name="file-eye-outline"
            size={16}
            color={Theme.colors.primary}
          />
          <AppText variant="caption" weight="700">
            Open
          </AppText>
        </View>
      ) : null}
      <View style={styles.scrollView}>
        {getTemplate()}
      </View>
    </TouchableOpacity>
  );
};

export default TemplateResumeCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    overflow: 'hidden',
    ...Theme.shadows.medium,
    backgroundColor: Theme.colors.surface,
  },
  scrollView: {
    width: '100%',
  },
  openBadge: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFFE6',
    borderRadius: Theme.radius.round,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  // Global Section Items Styles
  twoColRow: {
    flexDirection: 'row',
    marginBottom: 8,
    width: '100%',
  },
  leftCol: {
    width: '30%',
    paddingRight: 10,
  },
  rightCol: {
    width: '70%',
  },
  dateText: {
    fontSize: 12,
    color: '#111827',
  },
  headerBold: {
    fontSize: 12,
    color: '#111827',
  },
  bodyText: {
    fontSize: 11,
    color: '#4b5563',
    lineHeight: 15,
    marginTop: 2,
    marginBottom: 6,
  },

  // ==========================================
  // MODERN TEMPLATE STYLES
  // ==========================================
  modernContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  modernHeaderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#111827',
    paddingBottom: 10,
    marginBottom: 15,
  },
  modernHeaderLeft: {
    width: '58%',
  },
  modernHeaderRight: {
    width: '40%',
    alignItems: 'flex-end',
  },
  modernName: {
    fontSize: 22,
    color: '#111827',
    lineHeight: 26,
  },
  modernRole: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '500',
  },
  modernContactText: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 14,
  },
  modernSection: {
    marginBottom: 12,
  },
  modernTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#111827',
    marginBottom: 6,
  },
  modernSubTitle: {
    fontSize: 11,
    textTransform: 'uppercase',
    color: '#111827',
    marginBottom: 4,
  },
  modernSkillText: {
    fontSize: 11,
    color: '#4b5563',
    marginBottom: 2,
  },

  // ==========================================
  // CLASSIC TEMPLATE STYLES
  // ==========================================
  classicContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 25,
    margin: 10,
    backgroundColor: '#ffffff',
  },
  classicHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  classicName: {
    fontSize: 22,
    color: '#1a253c',
    letterSpacing: 0.5,
  },
  classicRole: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '600',
    letterSpacing: 0.8,
    marginTop: 2,
  },
  classicContactBar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#1a253c',
    borderBottomColor: '#1a253c',
    paddingVertical: 6,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  classicContactText: {
    fontSize: 9.5,
    color: '#4b5563',
    textAlign: 'center',
  },
  classicSection: {
    marginBottom: 12,
  },
  classicTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 2,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  classicSkillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  classicSkillItem: {
    width: '25%',
    marginBottom: 4,
  },
  classicSkillText: {
    fontSize: 11,
    color: '#374151',
  },

  // ==========================================
  // PROFESSIONAL TEMPLATE STYLES
  // ==========================================
  profContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  profHeaderWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  profHeaderLeft: {
    width: '60%',
  },
  profHeaderRight: {
    width: '38%',
    alignItems: 'flex-end',
  },
  profName: {
    fontFamily: 'Georgia',
    fontSize: 24,
    lineHeight: 28,
    color: '#000000',
  },
  profRole: {
    fontFamily: 'Georgia',
    fontSize: 11,
    color: '#4b5563',
    letterSpacing: 1,
    marginTop: 4,
    fontWeight: '600',
  },
  profContactText: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 14,
  },
  profSection: {
    marginBottom: 14,
  },
  profTitleContainer: {
    marginTop: 14,
    marginBottom: 8,
    position: 'relative',
    paddingTop: 8,
  },
  profTitleLine: {
    height: 1,
    backgroundColor: '#000000',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  profTitleAccent: {
    height: 4,
    width: 80,
    backgroundColor: '#000000',
    position: 'absolute',
    top: -1.5,
    left: 0,
  },
  profTitleText: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#000000',
  },
  profSkillsLine: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 16,
  },
});
