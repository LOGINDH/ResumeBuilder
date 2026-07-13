import {StyleSheet, Dimensions} from 'react-native';
import {Theme} from '../../theme';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  appContainer: {
    paddingHorizontal: 0, // Override AppScreen padding for edge-to-edge banner
    backgroundColor: Theme.colors.background,
  },

  container: {
    flex: 1,
  },

  // Banner Header
  headerGradient: {
    paddingTop: Theme.spacing.xl * 2,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: Theme.radius.xl,
    borderBottomRightRadius: Theme.radius.xl,
    alignItems: 'center',
    position: 'relative',
    ...Theme.shadows.medium,
  },

  editIconBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Theme.radius.round,
  },

  profileSection: {
    alignItems: 'center',
    marginTop: 10,
  },

  avatarContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.md,
  },

  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#C6A969',
    backgroundColor: '#E5E7EB',
  },

  avatarCameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#C6A969',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#111111',
  },

  profileName: {
    fontSize: 22,
    marginBottom: 4,
    textAlign: 'center',
  },

  profileRole: {
    fontSize: 14,
    marginBottom: 2,
    letterSpacing: 0.5,
  },

  profileEmail: {
    fontSize: 12,
    letterSpacing: 0.3,
  },

  // Statistics Dashboard Grid
  statsCardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.lg,
    marginTop: -25, // Overlap onto the banner slightly for a premium layout
    marginBottom: Theme.spacing.lg,
    zIndex: 5,
  },

  statTile: {
    flex: 1,
    backgroundColor: Theme.colors.surface,
    marginHorizontal: 6,
    borderRadius: Theme.radius.lg,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    ...Theme.shadows.medium,
  },

  statLabel: {
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 10,
    textAlign: 'center',
  },

  // Menu Options Group
  menuGroup: {
    paddingHorizontal: Theme.spacing.lg,
    marginTop: Theme.spacing.md,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.lg,
    marginBottom: Theme.spacing.md,
    ...Theme.shadows.small,
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuEmoji: {
    fontSize: 20,
    marginRight: Theme.spacing.md,
  },

  // Action Buttons Block
  actionBlock: {
    paddingHorizontal: Theme.spacing.lg,
    marginVertical: Theme.spacing.xl,
  },

  logoutBtn: {
    backgroundColor: '#111111',
    borderWidth: 1,
    borderColor: '#C6A969',
  },

  // Modal Backdrop and Wrapper
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: Theme.colors.surface,
    borderTopLeftRadius: Theme.radius.xl,
    borderTopRightRadius: Theme.radius.xl,
    padding: Theme.spacing.xl,
    maxHeight: height * 0.85,
    ...Theme.shadows.medium,
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
    paddingBottom: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },

  // Fields and Form Editing
  fieldLabel: {
    color: Theme.colors.text,
    marginBottom: 8,
    marginTop: Theme.spacing.md,
  },

  presetAvatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
    marginVertical: 10,
  },

  presetAvatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },

  selectedPresetAvatar: {
    borderColor: '#C6A969',
  },

  presetAvatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  modalFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: Theme.spacing.lg,
  },

  modalBtn: {
    flex: 1,
    height: 48,
    borderRadius: Theme.radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelBtn: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },

  saveBtn: {
    flex: 1.5,
    height: 48,
  },

  // History / Modals lists
  historyItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.border,
  },

  historyItemInfo: {
    flex: 1,
    paddingRight: 10,
  },

  clearHistoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.md,
    marginTop: Theme.spacing.md,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
    borderRadius: Theme.radius.lg,
  },

  emptyHistoryState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Theme.spacing.xl * 2,
  },

  templateUsedCard: {
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.radius.lg,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },

  templateUsedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  templateUsedBadge: {
    backgroundColor: Theme.colors.success,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Theme.radius.sm,
  },

  templateUsedTags: {
    flexDirection: 'row',
    gap: 6,
    marginTop: Theme.spacing.md,
  },

  tagBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Theme.radius.sm,
  },
});