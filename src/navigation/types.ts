import type {NavigatorScreenParams} from '@react-navigation/native';

export type Resume = {
  _id?: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  portfolio?: string;
  summary?: string;
  education?: string;
  experience?: string;
  projects?: string;
  certifications?: string;
  languages?: string;
  skills?: string[];
  templateId?: number;
  updatedAt?: string;
  createdAt?: string;
};

export type BottomTabParamList = {
  Home: undefined;
  Templates: undefined;
  MyResumes: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: NavigatorScreenParams<BottomTabParamList> | undefined;

  TemplatePreview: {
    templateId: number;
  };

  CreateResume: {
    templateId: number;
    resume?: Resume;
    focusTemplate?: boolean;
  };

  ResumeDetails: {
    resume: Resume;
  };

  PdfPreview: {
    resume: Resume;
  };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
