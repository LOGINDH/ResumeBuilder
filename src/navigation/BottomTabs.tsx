import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Home from '../screens/Home';
import Templates from '../screens/Templates';
import MyResumes from '../screens/MyResumes';
import Profile from '../screens/Profile';

import {BottomTabParamList} from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarActiveTintColor: '#C6A969',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: 10 + insets.bottom,
          borderTopWidth: 0,
          backgroundColor: '#FFFFFF',
          elevation: 15,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        tabBarIcon: ({focused, color, size}) => {
          let iconName = 'home';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;

            case 'Templates':
              iconName = focused ? 'color-palette' : 'color-palette-outline';
              break;

            case 'MyResumes':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;

            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{title: 'Home'}}
      />

      <Tab.Screen
        name="Templates"
        component={Templates}
        options={{title: 'Templates'}}
      />

      <Tab.Screen
        name="MyResumes"
        component={MyResumes}
        options={{title: 'My Resumes'}}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;