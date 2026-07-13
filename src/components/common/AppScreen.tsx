import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Theme} from '../../theme';

interface AppScreenProps extends ViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

const AppScreen = ({
  children,
  backgroundColor = Theme.colors.background,
  style,
  ...props
}: AppScreenProps) => {
  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor,
        },
      ]}
      edges={['top', 'left', 'right']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={backgroundColor}
        translucent={false}
      />

      <View
        style={[
          styles.container,
          style,
        ]}
        {...props}>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default AppScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
    backgroundColor: Theme.colors.background,
  },
});