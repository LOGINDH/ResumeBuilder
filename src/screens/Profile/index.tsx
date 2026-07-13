import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {launchImageLibrary} from 'react-native-image-picker';

import {AppScreen, AppText} from '../../components/common';
import {PrimaryButton} from '../../components/buttons';
import {Input} from '../../components/inputs';
import {getMe, updateMe} from '../../services/auth';
import {resumeService} from '../../services/resume';
import {TEMPLATES} from '../../constants/templates';
import {
  removeToken,
  saveUserProfileLocal,
  getUserProfileLocal,
  getDownloadHistoryLocal,
  clearDownloadHistoryLocal,
  DownloadHistoryItem,
} from '../../utils/storage';
import {navigationRef} from '../../navigation/navigationRef';
import {Theme} from '../../theme';
import styles from './styles';

const PRESET_AVATARS = [
  {
    id: 'avatar1',
    name: 'Executive Male',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
  },
  {
    id: 'avatar2',
    name: 'Executive Female',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
  },
  {
    id: 'avatar3',
    name: 'Technical Lead',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80',
  },
  {
    id: 'avatar4',
    name: 'Creative Designer',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80',
  },
  {
    id: 'avatar5',
    name: 'Software Engineer',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80',
  },
  {
    id: 'avatar6',
    name: 'Business Lead',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80',
  },
];

const DEFAULT_AVATAR = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

const Profile = () => {
  const navigation = useNavigation<any>();

  // Profile data state
  const [user, setUser] = useState<any>(null);
  const [resumesCount, setResumesCount] = useState(0);
  const [downloads, setDownloads] = useState<DownloadHistoryItem[]>([]);
  const [templatesUsed, setTemplatesUsed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit profile form state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [updating, setUpdating] = useState(false);

  // History modals state
  const [downloadsModalVisible, setDownloadsModalVisible] = useState(false);
  const [templatesModalVisible, setTemplatesModalVisible] = useState(false);

  const handleChooseFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
        maxWidth: 250,
        maxHeight: 250,
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
          Alert.alert('Error', response.errorMessage || 'Failed to select image');
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          if (asset.base64) {
            const base64Uri = `data:${asset.type || 'image/jpeg'};base64,${asset.base64}`;
            setEditAvatar(base64Uri);
            setCustomAvatarUrl(base64Uri);
          } else if (asset.uri) {
            setEditAvatar(asset.uri);
            setCustomAvatarUrl(asset.uri);
          }
        }
      },
    );
  };

  // Load profile and statistics
  const fetchProfileData = async () => {
    try {
      setLoading(true);

      // 1. Fetch user data (try API first, fallback to Local Storage)
      let userData = null;
      try {
        const response = await getMe();
        if (response?.user) {
          userData = response.user;
          await saveUserProfileLocal(userData);
        }
      } catch (err) {
        console.log('Backend unreachable, using offline profile.');
        userData = await getUserProfileLocal();
      }

      if (userData) {
        setUser(userData);
        setEditName(userData.name || '');
        setEditRole(userData.role || 'Professional');
        setEditAvatar(userData.avatar || '');
        if (userData.avatar && !PRESET_AVATARS.some(a => a.url === userData.avatar)) {
          setCustomAvatarUrl(userData.avatar);
        }
      }

      // 2. Fetch resumes count
      let resumesList = [];
      try {
        resumesList = await resumeService.getMyResumes();
        setResumesCount(resumesList.length);
      } catch (err) {
        console.log('Failed to fetch resumes count from server.');
      }

      // 3. Load Download History
      const downloadHistory = await getDownloadHistoryLocal();
      setDownloads(downloadHistory);

      // 4. Calculate unique templates used
      if (resumesList.length > 0) {
        const templateIds = Array.from(new Set(resumesList.map((r: any) => r.templateId || 1)));
        const used = TEMPLATES.filter(t => templateIds.includes(t.id));
        setTemplatesUsed(used);
      } else {
        setTemplatesUsed([]);
      }

    } catch (error) {
      console.log('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  // React Navigation Focus hook to reload when screen is visible
  useFocusEffect(
    useCallback(() => {
      fetchProfileData();
    }, []),
  );

  // Save profile updates
  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      Alert.alert('Validation Error', 'Please enter your name.');
      return;
    }

    try {
      setUpdating(true);
      const chosenAvatar = customAvatarUrl.trim() || editAvatar || DEFAULT_AVATAR;

      const profileData = {
        name: editName,
        role: editRole || 'React Native Developer',
        avatar: chosenAvatar,
      };

      // 1. Try to update on the server
      let updatedUser = null;
      try {
        const response = await updateMe(profileData);
        if (response?.success && response?.user) {
          updatedUser = response.user;
        }
      } catch (error) {
        console.log('Failed to save to backend, saving offline profile.');
      }

      // 2. Local fallback if server fails
      if (!updatedUser) {
        updatedUser = {
          ...user,
          ...profileData,
        };
      }

      // Save locally
      await saveUserProfileLocal(updatedUser);
      setUser(updatedUser);
      setEditModalVisible(false);
      Alert.alert('Success', 'Profile updated successfully.');
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to update profile.');
    } finally {
      setUpdating(false);
    }
  };

  const handleClearHistory = async () => {
    Alert.alert('Clear History', 'Are you sure you want to clear your download history?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await clearDownloadHistoryLocal();
          setDownloads([]);
          Alert.alert('Success', 'Download history cleared.');
        },
      },
    ]);
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  };

  if (loading && !user) {
    return (
      <AppScreen style={styles.center}>
        <ActivityIndicator size="large" color={Theme.colors.secondary} />
        <AppText style={{marginTop: 10}}>Loading Profile...</AppText>
      </AppScreen>
    );
  }

  const avatarSource = user?.avatar ? {uri: user.avatar} : {uri: DEFAULT_AVATAR};

  return (
    <AppScreen style={styles.appContainer}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}>

        {/* Professional Header Banner */}
        <LinearGradient
          colors={['#111111', '#2C2C2C']}
          style={styles.headerGradient}>
          
          <TouchableOpacity
            style={styles.editIconBtn}
            onPress={() => setEditModalVisible(true)}>
            <Ionicons name="create-outline" size={20} color="#C6A969" />
          </TouchableOpacity>

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image source={avatarSource} style={styles.avatarImage} />
              <TouchableOpacity
                style={styles.avatarCameraBadge}
                onPress={() => setEditModalVisible(true)}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <AppText variant="h2" weight="700" color="#FFFFFF" style={styles.profileName}>
              {user?.name || 'Your Name'}
            </AppText>

            <AppText variant="body" weight="500" color="#C6A969" style={styles.profileRole}>
              {user?.role || 'React Native Developer'}
            </AppText>
            
            <AppText variant="caption" color="#9CA3AF" style={styles.profileEmail}>
              {user?.email || 'email@example.com'}
            </AppText>
          </View>

        </LinearGradient>

        {/* Dashboard Statistics */}
        <View style={styles.statsCardGrid}>
          
          <View style={styles.statTile}>
            <AppText variant="h1" weight="700" color="#111111">
              {resumesCount}
            </AppText>
            <AppText variant="caption" weight="600" color="#6B7280" style={styles.statLabel}>
              My Resumes
            </AppText>
          </View>

          <View style={styles.statTile}>
            <AppText variant="h1" weight="700" color="#111111">
              {downloads.length}
            </AppText>
            <AppText variant="caption" weight="600" color="#6B7280" style={styles.statLabel}>
              Downloads
            </AppText>
          </View>

          <View style={styles.statTile}>
            <AppText variant="h1" weight="700" color="#111111">
              {templatesUsed.length}
            </AppText>
            <AppText variant="caption" weight="600" color="#6B7280" style={styles.statLabel}>
              Templates Used
            </AppText>
          </View>

        </View>

        {/* Interactive Menu Options */}
        <View style={styles.menuGroup}>
          
          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => navigation.navigate('MyResumes')}>
            <View style={styles.menuLeft}>
              <Ionicons name="document-text-outline" size={22} color="#C6A969" style={{marginRight: Theme.spacing.md}} />
              <AppText variant="title" weight="600" color="#111111">
                My Resumes
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => setDownloadsModalVisible(true)}>
            <View style={styles.menuLeft}>
              <Ionicons name="download-outline" size={22} color="#C6A969" style={{marginRight: Theme.spacing.md}} />
              <AppText variant="title" weight="600" color="#111111">
                Download History
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => setTemplatesModalVisible(true)}>
            <View style={styles.menuLeft}>
              <Ionicons name="color-palette-outline" size={22} color="#C6A969" style={{marginRight: Theme.spacing.md}} />
              <AppText variant="title" weight="600" color="#111111">
                Templates Used
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuRow}
            onPress={() => setEditModalVisible(true)}>
            <View style={styles.menuLeft}>
              <Ionicons name="settings-outline" size={22} color="#C6A969" style={{marginRight: Theme.spacing.md}} />
              <AppText variant="title" weight="600" color="#111111">
                Edit Profile Settings
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

        </View>

        {/* Logout Button */}
        <View style={styles.actionBlock}>
          <PrimaryButton
            title="LOGOUT"
            style={styles.logoutBtn}
            onPress={async () => {
              await removeToken();
              if (navigationRef.isReady()) {
                navigationRef.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                });
              }
            }}
          />
        </View>

      </ScrollView>

      {/* ================= EDIT PROFILE MODAL ================= */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText variant="h2" weight="700">
                Edit Profile
              </AppText>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color="#111111" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
              
              <AppText variant="body" weight="600" style={styles.fieldLabel}>
                Full Name
              </AppText>
              <Input
                placeholder="Enter Full Name"
                value={editName}
                onChangeText={setEditName}
              />

              <AppText variant="body" weight="600" style={styles.fieldLabel}>
                Professional Title / Role
              </AppText>
              <Input
                placeholder="React Native Developer"
                value={editRole}
                onChangeText={setEditRole}
              />

              <AppText variant="body" weight="600" style={styles.fieldLabel}>
                Profile Picture
              </AppText>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 15, marginVertical: 10}}>
                <Image
                  source={editAvatar || customAvatarUrl ? {uri: editAvatar || customAvatarUrl} : {uri: DEFAULT_AVATAR}}
                  style={{width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: Theme.colors.border}}
                />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#111111',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: Theme.radius.sm,
                    borderWidth: 1,
                    borderColor: '#C6A969',
                    gap: 6
                  }}
                  onPress={handleChooseFromGallery}>
                  <Ionicons name="image-outline" size={16} color="#C6A969" />
                  <AppText color="#C6A969" weight="700" style={{fontSize: 13}}>
                    CHOOSE FROM GALLERY
                  </AppText>
                </TouchableOpacity>
              </View>

              <AppText variant="body" weight="600" style={styles.fieldLabel}>
                Or Select Preset Executive Avatar
              </AppText>
              <View style={styles.presetAvatarGrid}>
                {PRESET_AVATARS.map(avatar => {
                  const isSelected = editAvatar === avatar.url && !customAvatarUrl;
                  return (
                    <TouchableOpacity
                      key={avatar.id}
                      style={[
                        styles.presetAvatarWrapper,
                        isSelected && styles.selectedPresetAvatar,
                      ]}
                      onPress={() => {
                        setEditAvatar(avatar.url);
                        setCustomAvatarUrl(''); // clear custom
                      }}>
                      <Image source={{uri: avatar.url}} style={styles.presetAvatarImage} />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.modalFooterRow}>
                <TouchableOpacity
                  style={[styles.modalBtn, styles.cancelBtn]}
                  onPress={() => setEditModalVisible(false)}>
                  <AppText weight="700" color="#6B7280">
                    CANCEL
                  </AppText>
                </TouchableOpacity>

                <PrimaryButton
                  title={updating ? 'SAVING...' : 'SAVE CHANGES'}
                  onPress={handleSaveProfile}
                  loading={updating}
                  style={styles.saveBtn}
                />
              </View>

            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ================= DOWNLOAD HISTORY MODAL ================= */}
      <Modal
        visible={downloadsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDownloadsModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                <Ionicons name="download-outline" size={24} color="#C6A969" style={{marginRight: 6}} />
                <AppText variant="h2" weight="700">
                  Download History
                </AppText>
              </View>
              <TouchableOpacity onPress={() => setDownloadsModalVisible(false)}>
                <Ionicons name="close" size={24} color="#111111" />
              </TouchableOpacity>
            </View>

            {downloads.length > 0 ? (
              <>
                <FlatList
                  data={downloads}
                  keyExtractor={(item, index) => `${item.id}_${index}`}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <View style={styles.historyItemRow}>
                      <View style={styles.historyItemInfo}>
                        <AppText variant="title" weight="700" color="#111111">
                          {item.title}
                        </AppText>
                        <AppText variant="caption" color="#6B7280" style={{marginTop: 2}}>
                          Template: <AppText variant="caption" weight="700" color="#C6A969">{item.templateName}</AppText>
                        </AppText>
                      </View>
                      <AppText variant="caption" color="#9CA3AF">
                        {formatTime(item.downloadedAt)}
                      </AppText>
                    </View>
                  )}
                  style={{maxHeight: 400}}
                />
                
                <TouchableOpacity
                  style={styles.clearHistoryBtn}
                  onPress={handleClearHistory}>
                  <Ionicons name="trash-outline" size={16} color="#DC2626" />
                  <AppText color="#DC2626" weight="700" style={{marginLeft: 4}}>
                    Clear Download History
                  </AppText>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.emptyHistoryState}>
                <Ionicons name="download-outline" size={50} color="#D1D5DB" />
                <AppText color="#6B7280" style={{marginTop: 10, textAlign: 'center'}}>
                  No download history recorded. Download a resume PDF to see records here.
                </AppText>
              </View>
            )}

            <PrimaryButton
              title="CLOSE"
              onPress={() => setDownloadsModalVisible(false)}
              style={{marginTop: 15}}
            />
          </View>
        </View>
      </Modal>

      {/* ================= TEMPLATES USED MODAL ================= */}
      <Modal
        visible={templatesModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTemplatesModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                <Ionicons name="color-palette-outline" size={24} color="#C6A969" style={{marginRight: 6}} />
                <AppText variant="h2" weight="700">
                  Templates in Use
                </AppText>
              </View>
              <TouchableOpacity onPress={() => setTemplatesModalVisible(false)}>
                <Ionicons name="close" size={24} color="#111111" />
              </TouchableOpacity>
            </View>

            {templatesUsed.length > 0 ? (
              <FlatList
                data={templatesUsed}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                  <View style={styles.templateUsedCard}>
                    <View style={styles.templateUsedHeader}>
                      <AppText variant="title" weight="700" color="#111111">
                        {item.name} Design
                      </AppText>
                      <View style={styles.templateUsedBadge}>
                        <AppText variant="caption" color="#FFFFFF" weight="700">
                          Active
                        </AppText>
                      </View>
                    </View>
                    
                    <AppText variant="caption" color="#4B5563" style={{marginTop: 4, lineHeight: 16}}>
                      {item.description}
                    </AppText>

                    <View style={styles.templateUsedTags}>
                      {item.tags.slice(0, 3).map((tag: string, idx: number) => (
                        <View key={idx} style={styles.tagBadge}>
                          <AppText variant="caption" color="#6B7280" weight="600">
                            {tag}
                          </AppText>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
                style={{maxHeight: 400}}
              />
            ) : (
              <View style={styles.emptyHistoryState}>
                <Ionicons name="color-palette-outline" size={50} color="#D1D5DB" />
                <AppText color="#6B7280" style={{marginTop: 10, textAlign: 'center'}}>
                  No templates currently in use. Create a resume to see templates listed here.
                </AppText>
              </View>
            )}

            <PrimaryButton
              title="CLOSE"
              onPress={() => setTemplatesModalVisible(false)}
              style={{marginTop: 15}}
            />
          </View>
        </View>
      </Modal>

    </AppScreen>
  );
};

export default Profile;