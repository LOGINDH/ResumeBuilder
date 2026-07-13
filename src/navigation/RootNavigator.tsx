import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ResumeDetails from '../screens/ResumeDetails';
import Splash from '../screens/Splash';
import AuthNavigator from './AuthNavigator';
import BottomTabs from './BottomTabs';

import TemplatePreview from '../screens/TemplatePreview';
import CreateResume from '../screens/CreateResume';
import PdfPreview from '../screens/PdfPreview';

import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>

      <Stack.Screen
        name="Splash"
        component={Splash}
      />

      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
      />

      <Stack.Screen
        name="Main"
        component={BottomTabs}
      />

      <Stack.Screen
        name="TemplatePreview"
        component={TemplatePreview}
      />

      <Stack.Screen
        name="CreateResume"
        component={CreateResume}
      />

      <Stack.Screen
        name="ResumeDetails"
        component={ResumeDetails}
      />

      <Stack.Screen
        name="PdfPreview"
        component={PdfPreview}
      />

    </Stack.Navigator>
  );
};

export default RootNavigator;
