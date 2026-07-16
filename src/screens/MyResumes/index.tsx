import React, {useCallback, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  Alert,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import {AppScreen, AppText} from '../../components/common';
import {ResumeCard} from '../../components/cards';
import {resumeService} from '../../services/resume';
import type {Resume} from '../../navigation/types';

const MyResumes = () => {
  const navigation = useNavigation<any>();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadResumes = async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      }
      const data = await resumeService.getMyResumes();
      setResumes(data || []);
    } catch (error: any) {
      console.log('Error loading resumes:', error);
      Alert.alert(
        'Error',
        error?.response?.data?.message || error?.response?.data?.error || error?.message || 'Failed to load resumes',
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadResumes(true);
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadResumes();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <AppScreen>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <FlatList
        data={resumes}
        keyExtractor={(item, index) => item._id || `${item.name}-${index}`}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <View style={{marginBottom: 20}}>
            <AppText variant="h2" weight="700">
              My Resumes
            </AppText>

            <AppText>
              {resumes.length} Resume(s)
            </AppText>
          </View>
        }
        ListEmptyComponent={
          <View
            style={{
              marginTop: 100,
              alignItems: 'center',
            }}>
            <AppText>No resumes found.</AppText>
          </View>
        }
        renderItem={({item}) => (
          <ResumeCard
            title={item.name || 'Untitled Resume'}
            updated={`Created: ${formatDate(item.createdAt)}`}
            onPress={() =>
              navigation.navigate('PdfPreview', {
                resume: item,
              })
            }
          />
        )}
      />
    </AppScreen>
  );
};

export default MyResumes;
